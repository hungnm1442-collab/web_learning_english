const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
const Recognition = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null

export const canSpeak = Boolean(synth)
export const canRecognize = Boolean(Recognition)

let voiceCache = null

function pickVoice() {
  if (!synth) return null
  if (!voiceCache || !voiceCache.length) voiceCache = synth.getVoices()
  const english = voiceCache.filter((voice) => voice.lang.toLowerCase().startsWith('en'))
  return english.find((voice) => voice.lang === 'en-US') || english[0] || null
}

if (synth) {
  synth.addEventListener?.('voiceschanged', () => {
    voiceCache = synth.getVoices()
  })
}

export function speak(text, rate = 0.9) {
  if (!synth) return false
  synth.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  const voice = pickVoice()
  if (voice) utterance.voice = voice
  utterance.lang = voice?.lang || 'en-US'
  utterance.rate = rate
  synth.speak(utterance)
  return true
}

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z\s']/g, '').replace(/\s+/g, ' ').trim()
}

function distance(a, b) {
  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i])
  for (let j = 1; j <= b.length; j += 1) rows[0][j] = j
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      rows[i][j] = Math.min(
        rows[i - 1][j] + 1,
        rows[i][j - 1] + 1,
        rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
  }
  return rows[a.length][b.length]
}

export function scoreSpeech(target, heard) {
  const goal = normalize(target)
  const candidates = heard.map(normalize).filter(Boolean)
  if (!candidates.length) return { score: 0, heard: '' }
  let best = { score: 0, heard: candidates[0] }
  for (const candidate of candidates) {
    const longest = Math.max(goal.length, candidate.length) || 1
    const score = Math.round((1 - distance(goal, candidate) / longest) * 100)
    if (score > best.score) best = { score, heard: candidate }
  }
  return best
}

export function listen(onDone, onError) {
  if (!Recognition) {
    onError('unsupported')
    return () => {}
  }
  const recognition = new Recognition()
  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.maxAlternatives = 5
  recognition.onresult = (event) => {
    const alternatives = Array.from(event.results[0]).map((item) => item.transcript)
    onDone(alternatives)
  }
  recognition.onerror = (event) => onError(event.error)
  recognition.onnomatch = () => onError('no-match')
  try {
    recognition.start()
  } catch {
    onError('busy')
  }
  return () => {
    try {
      recognition.abort()
    } catch {
      /* already stopped */
    }
  }
}
