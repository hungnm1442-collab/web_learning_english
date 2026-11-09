import { useEffect, useMemo, useState } from 'react'
import { supabase } from './lib/supabase'
import { useProgress } from './lib/progress'
import { lessons } from './data/lessons'
import { vocabulary } from './data/vocabulary'
import { icons } from './components/icons'
import { AuthModal } from './components/AuthModal'
import { LandingPage } from './components/LandingPage'
import { Dashboard } from './views/Dashboard'
import { Lessons } from './views/Lessons'
import { Vocabulary } from './views/Vocabulary'
import { Flashcards } from './views/Flashcards'
import { Pronunciation } from './views/Pronunciation'
import { Settings } from './views/Settings'
import './App.css'

const navItems = [
  { id: 'dashboard', label: 'Tổng quan học tập', icon: 'home' },
  { id: 'lessons', label: 'Bài học', icon: 'book' },
  { id: 'vocabulary', label: 'Từ vựng', icon: 'chart' },
  { id: 'flashcards', label: 'Flashcard', icon: 'cards' },
  { id: 'pronunciation', label: 'Phát âm', icon: 'mic' },
]

const viewAliases = { path: 'dashboard' }

function initialView() {
  if (typeof window === 'undefined') return 'landing'
  const param = new URLSearchParams(window.location.search).get('view')
  const view = viewAliases[param] || param
  return [...navItems.map((item) => item.id), 'settings'].includes(view) ? view : 'landing'
}

function greeting() {
  const hour = new Date().getHours()
  if (hour < 11) return 'Chào buổi sáng'
  if (hour < 18) return 'Chào buổi chiều'
  return 'Chào buổi tối'
}

function App() {
  const [view, setView] = useState(initialView)
  const [session, setSession] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [lessonId, setLessonId] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [vocabQuery, setVocabQuery] = useState('')
  const progress = useProgress(session)
  const { state, stats } = progress

  useEffect(() => {
    if (!supabase) return undefined
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })
    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [view, lessonId])

  const navigate = (next) => {
    setView(next)
    setSearchOpen(false)
    if (next !== 'lessons') setLessonId(null)
  }

  const openLesson = (id) => {
    setView('lessons')
    setLessonId(id)
    setSearchOpen(false)
  }

  const signOut = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Không thể đăng xuất:', error)
        return
      }
    }
    setSession(null)
    setView('landing')
  }

  const nextLesson = lessons.find((lesson) => !state.lessons[lesson.id]?.done) || lessons[0]
  const userName = session?.user?.email?.split('@')[0] || 'bạn'
  const userInitials = session?.user?.email?.slice(0, 2).toUpperCase() || 'KH'

  const searchResults = useMemo(() => {
    const needle = searchQuery.trim().toLowerCase()
    if (!needle) return []
    const lessonHits = lessons
      .filter((item) => item.title.toLowerCase().includes(needle) || item.summary.toLowerCase().includes(needle))
      .slice(0, 4)
      .map((item) => ({ key: item.id, label: item.title, sub: 'Bài học', action: () => openLesson(item.id) }))
    const wordHits = vocabulary
      .filter((item) => item.word.includes(needle) || item.meaning.toLowerCase().includes(needle))
      .slice(0, 6)
      .map((item) => ({
        key: item.id,
        label: item.word,
        sub: item.meaning,
        action: () => {
          setVocabQuery(item.word)
          navigate('vocabulary')
        },
      }))
    return [...lessonHits, ...wordHits]
  }, [searchQuery])

  if (view === 'landing') {
    return (
      <>
        <LandingPage onStart={() => setView('dashboard')} onAuth={() => setAuthOpen(true)} />
        {authOpen && (
          <AuthModal
            onClose={() => setAuthOpen(false)}
            onAuthenticated={(nextSession) => {
              setSession(nextSession)
              setAuthOpen(false)
              setView('dashboard')
            }}
          />
        )}
      </>
    )
  }

  const reviewable = stats.dueCount + stats.newToday

  return (
    <div className="app-shell learning-theme v24-workspace">
      <aside className="sidebar v24-sidebar">
        <div className="v24-sidebar-top">
          <button type="button" className="brand" onClick={() => setView('landing')} aria-label="Về trang giới thiệu">
            <div className="brand-mark">L</div>
            <div className="brand-text">
              <strong>Lingo<span>ly</span></strong>
              <small>Tự học tiếng Anh</small>
            </div>
          </button>
        </div>

        <button type="button" className={`v24-ask-pill ${searchOpen ? 'is-open' : ''}`} onClick={() => setSearchOpen(!searchOpen)}>
          {icons.search}
          <span>Tìm bài học, từ vựng...</span>
        </button>

        <nav className="main-nav" aria-label="Điều hướng chính">
          <p className="nav-label">HỌC TẬP</p>
          {navItems.map((item) => (
            <button key={item.id} type="button" className={`nav-item ${view === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)}>
              {icons[item.icon]}
              <span>{item.label}</span>
              {item.id === 'flashcards' && stats.dueCount > 0 && <b className="nav-badge">{stats.dueCount}</b>}
              {item.id === 'lessons' && <b className="nav-badge is-subtle">{stats.doneLessons}/{stats.totalLessons}</b>}
            </button>
          ))}

          <p className="nav-label nav-label-spaced">HỆ THỐNG</p>
          <button type="button" className={`nav-item ${view === 'settings' ? 'active' : ''}`} onClick={() => navigate('settings')}>
            {icons.settings}
            <span>Cài đặt</span>
          </button>
          <button type="button" className="nav-item" onClick={() => setView('landing')}>
            {icons.home}
            <span>Trang giới thiệu</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="v24-user-card" onClick={() => (session ? navigate('settings') : setAuthOpen(true))} aria-label={session ? 'Mở cài đặt tài khoản' : 'Đăng nhập để lưu tiến độ'}>
            <div className="avatar">
              {userInitials}
              <i className="v24-online-dot" />
            </div>
            <div className="v24-user-meta">
              <strong>{session ? userName : 'Khách học'}</strong>
              <span>{session ? 'Tiến độ đã đồng bộ' : 'Đăng nhập để đồng bộ'}</span>
            </div>
          </button>
        </div>
      </aside>

      <main className="main-content v24-glass-board">
        <header className="v24-board-header">
          <div className="v24-greeting">
            <h1>{greeting()}, {userName}</h1>
            <p>
              {stats.streak ? `Bạn đang có chuỗi ${stats.streak} ngày học liên tiếp.` : 'Học một chút hôm nay để bắt đầu chuỗi ngày học.'}
              {reviewable ? ` Có ${reviewable} thẻ từ vựng đang chờ.` : ''}
            </p>
          </div>
          <div className="v24-header-actions">
            <button type="button" className="v24-pill-btn v24-pill-light" onClick={() => navigate('flashcards')}>
              {icons.cards}
              <span>Ôn flashcard</span>
            </button>
            <button type="button" className="v24-pill-btn v24-pill-dark" onClick={() => openLesson(nextLesson.id)}>
              {icons.plus}
              <span>Học bài tiếp theo</span>
            </button>
          </div>
        </header>

        {searchOpen && (
          <div className="v24-search-drawer">
            <div className="v24-search-bar">
              {icons.search}
              <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Nhập tên bài học hoặc từ vựng (ví dụ: present, coffee, thói quen)" aria-label="Tìm kiếm" />
              <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery('') }}>Đóng</button>
            </div>
            {searchQuery.trim() && (
              searchResults.length ? (
                <div className="v24-search-results">
                  {searchResults.map((item) => (
                    <button key={item.key} type="button" onClick={item.action}>
                      <strong>{item.label}</strong>
                      <span>{item.sub}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="v24-search-empty">Không có kết quả cho “{searchQuery}”.</p>
              )
            )}
          </div>
        )}

        <div className="v24-board-body">
          {view === 'dashboard' && <Dashboard state={state} stats={stats} onNavigate={navigate} onOpenLesson={openLesson} />}
          {view === 'lessons' && <Lessons state={state} activeId={lessonId} onSelect={setLessonId} onComplete={progress.completeLesson} />}
          {view === 'vocabulary' && <Vocabulary state={state} stats={stats} query={vocabQuery} onQueryChange={setVocabQuery} onStudy={() => navigate('flashcards')} />}
          {view === 'flashcards' && <Flashcards state={state} stats={stats} onReview={progress.reviewCard} />}
          {view === 'pronunciation' && <Pronunciation state={state} onScore={progress.recordPronunciation} />}
          {view === 'settings' && (
            <Settings session={session} state={state} onSettings={progress.updateSettings} onReset={progress.resetAll} onSignOut={session ? signOut : () => setAuthOpen(true)} />
          )}
        </div>
      </main>

      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onAuthenticated={(nextSession) => {
            setSession(nextSession)
            setAuthOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default App
