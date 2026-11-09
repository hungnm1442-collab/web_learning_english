import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from './supabase'
import { vocabulary } from '../data/vocabulary'
import { lessons } from '../data/lessons'

const LEGACY_KEY = 'lingoly:progress:v2'
const STORAGE_PREFIX = 'lingoly:progress:v2:'
const INTERVALS = [0, 1, 2, 4, 7, 14, 30]
export const MASTERED_BOX = 4

export const DEFAULT_SETTINGS = { dailyGoal: 10, newPerDay: 8 }

const emptyState = () => ({
  updatedAt: 0,
  lessons: {},
  cards: {},
  days: [],
  daily: {},
  pron: {},
  settings: { ...DEFAULT_SETTINGS },
})

function storageKey(userId) {
  return `${STORAGE_PREFIX}${userId ? `user:${userId}` : 'guest'}`
}

function normalize(raw) {
  if (!raw || typeof raw !== 'object') return emptyState()
  return { ...emptyState(), ...raw, settings: { ...DEFAULT_SETTINGS, ...raw.settings } }
}

export function dateKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function addDays(key, amount) {
  const [y, m, d] = key.split('-').map(Number)
  return dateKey(new Date(y, m - 1, d + amount))
}

function load(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || 'null')
    return normalize(parsed)
  } catch {
    return emptyState()
  }
}

function markToday(state, field, amount = 1) {
  const today = dateKey()
  const days = state.days.includes(today) ? state.days : [...state.days, today].sort()
  const day = state.daily[today] || { cards: 0, lessons: 0 }
  return {
    days,
    daily: { ...state.daily, [today]: { ...day, [field]: day[field] + amount } },
  }
}

export function getWordStatus(card, today = dateKey()) {
  if (!card) return 'new'
  if (card.due <= today) return 'due'
  return card.box >= MASTERED_BOX ? 'mastered' : 'learning'
}

export function computeStreak(days) {
  const set = new Set(days)
  const today = dateKey()
  let cursor = set.has(today) ? today : addDays(today, -1)
  let streak = 0
  while (set.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

export function useProgress(session) {
  const userId = session?.user?.id
  const key = storageKey(userId)
  const [store, setStore] = useState(() => ({ [key]: load(key) }))
  const [readyUser, setReadyUser] = useState(null)
  const warned = useRef(false)
  const state = useMemo(() => store[key] ?? load(key), [store, key])

  useEffect(() => {
    try {
      localStorage.removeItem(LEGACY_KEY)
    } catch {
      // Ignore storage access errors in restricted browsing modes.
    }
  }, [])

  useEffect(() => {
    if (!supabase || !userId) return undefined
    const targetKey = storageKey(userId)
    let active = true
    supabase
      .from('user_state')
      .select('data')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          if (!warned.current) console.warn('Chưa đồng bộ được tiến độ (hãy chạy supabase/schema.sql):', error.message)
          warned.current = true
          return
        }
        const local = load(targetKey)
        const remote = data?.data ? normalize(data.data) : null
        if (remote && (remote.updatedAt ?? 0) >= (local.updatedAt ?? 0)) {
          localStorage.setItem(targetKey, JSON.stringify(remote))
          setStore((prev) => ({ ...prev, [targetKey]: remote }))
        }
        setReadyUser(userId)
      })
    return () => {
      active = false
    }
  }, [userId])

  useEffect(() => {
    if (!supabase || !userId || readyUser !== userId || !state.updatedAt) return undefined
    const timer = setTimeout(() => {
      supabase
        .from('user_state')
        .upsert({ user_id: userId, data: state, updated_at: new Date().toISOString() })
        .then(({ error }) => {
          if (error && !warned.current) console.warn('Không thể đồng bộ tiến độ:', error.message)
        })
    }, 600)
    return () => clearTimeout(timer)
  }, [state, userId, readyUser])

  const update = useCallback((producer) => {
    setStore((prev) => {
      const current = prev[key] ?? load(key)
      const next = { ...producer(current), updatedAt: Date.now() }
      localStorage.setItem(key, JSON.stringify(next))
      return { ...prev, [key]: next }
    })
  }, [key])

  const completeLesson = useCallback((lessonId, score, total) => {
    update((current) => {
      const previous = current.lessons[lessonId]
      const passed = score / total >= 0.6
      return {
        ...current,
        ...markToday(current, 'lessons'),
        lessons: {
          ...current.lessons,
          [lessonId]: {
            best: Math.max(previous?.best ?? 0, Math.round((score / total) * 100)),
            attempts: (previous?.attempts ?? 0) + 1,
            done: previous?.done || passed,
            at: dateKey(),
          },
        },
      }
    })
  }, [update])

  const reviewCard = useCallback((wordId, rating) => {
    update((current) => {
      const previous = current.cards[wordId] || { box: 0, reps: 0, lapses: 0 }
      let box = previous.box
      if (rating === 'again') box = 1
      else if (rating === 'good') box = Math.min(box + 1, 6)
      else box = Math.min(box + 2, 6)
      const due = rating === 'again' ? dateKey() : addDays(dateKey(), INTERVALS[box])
      const marked = markToday(current, 'cards')
      if (!current.cards[wordId]) {
        const today = dateKey()
        marked.daily[today] = { ...marked.daily[today], newCards: (marked.daily[today].newCards ?? 0) + 1 }
      }
      return {
        ...current,
        ...marked,
        cards: {
          ...current.cards,
          [wordId]: {
            box,
            due,
            reps: previous.reps + 1,
            lapses: previous.lapses + (rating === 'again' ? 1 : 0),
          },
        },
      }
    })
  }, [update])

  const recordPronunciation = useCallback((key, score) => {
    update((current) => ({
      ...current,
      ...markToday(current, 'cards', 0),
      pron: { ...current.pron, [key]: Math.max(current.pron[key] ?? 0, score) },
    }))
  }, [update])

  const updateSettings = useCallback((patch) => {
    update((current) => ({ ...current, settings: { ...current.settings, ...patch } }))
  }, [update])

  const resetAll = useCallback(() => {
    const next = { ...emptyState(), updatedAt: Date.now() }
    localStorage.setItem(key, JSON.stringify(next))
    setStore((prev) => ({ ...prev, [key]: next }))
  }, [key])

  const stats = useMemo(() => {
    const today = dateKey()
    const cardEntries = Object.entries(state.cards)
    const dueIds = cardEntries.filter(([, card]) => card.due <= today).map(([id]) => id)
    const mastered = cardEntries.filter(([, card]) => card.box >= MASTERED_BOX).length
    const learned = cardEntries.length
    const newToday = Math.max(0, state.settings.newPerDay - (state.daily[today]?.newCards ?? 0))
    const doneLessons = lessons.filter((lesson) => state.lessons[lesson.id]?.done).length
    const todayDaily = state.daily[today] || { cards: 0, lessons: 0 }
    const last7 = Array.from({ length: 7 }, (_, index) => {
      const key = addDays(today, index - 6)
      return { key, active: state.days.includes(key), isToday: key === today, count: (state.daily[key]?.cards ?? 0) + (state.daily[key]?.lessons ?? 0) }
    })
    return {
      today,
      dueIds,
      dueCount: dueIds.length,
      mastered,
      learned,
      total: vocabulary.length,
      newToday,
      doneLessons,
      totalLessons: lessons.length,
      streak: computeStreak(state.days),
      todayDaily,
      goalProgress: Math.min(1, todayDaily.cards / state.settings.dailyGoal),
      last7,
      pathProgress: Math.round((doneLessons / lessons.length) * 100),
    }
  }, [state])

  return { state, stats, completeLesson, reviewCard, recordPronunciation, updateSettings, resetAll }
}
