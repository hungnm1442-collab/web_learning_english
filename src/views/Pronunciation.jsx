import { useEffect, useMemo, useRef, useState } from 'react'
import { minimalPairs, topics, vocabulary } from '../data/vocabulary'
import { icons } from '../components/icons'
import { canRecognize, canSpeak, listen, scoreSpeech, speak } from '../lib/speech'

const errorMessages = {
  unsupported: 'Trình duyệt này chưa hỗ trợ nhận diện giọng nói. Hãy dùng Chrome hoặc Edge.',
  'not-allowed': 'Bạn chưa cấp quyền micro. Hãy cho phép micro trong thanh địa chỉ rồi thử lại.',
  'service-not-allowed': 'Bạn chưa cấp quyền micro. Hãy cho phép micro rồi thử lại.',
  'no-speech': 'Không nghe thấy giọng nói. Hãy đọc to và rõ hơn.',
  'no-match': 'Chưa nhận ra từ nào. Hãy thử lại.',
  'audio-capture': 'Không tìm thấy micro trên thiết bị.',
  network: 'Nhận diện giọng nói cần kết nối mạng.',
  busy: 'Micro đang bận, hãy thử lại sau giây lát.',
}

function verdict(score) {
  if (score >= 85) return { label: 'Rất tốt', tone: 'good' }
  if (score >= 60) return { label: 'Khá ổn, thử lại để chuẩn hơn', tone: 'ok' }
  return { label: 'Cần luyện thêm', tone: 'low' }
}

function Recorder({ target, onScore }) {
  const [phase, setPhase] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const stop = useRef(() => {})

  useEffect(() => () => stop.current(), [])

  const start = () => {
    setError('')
    setResult(null)
    setPhase('listening')
    stop.current = listen(
      (alternatives) => {
        const scored = scoreSpeech(target, alternatives)
        setResult(scored)
        setPhase('idle')
        onScore(scored.score)
      },
      (code) => {
        setPhase('idle')
        setError(errorMessages[code] || 'Không thể ghi âm lúc này.')
      },
    )
  }

  return (
    <div className="v24-recorder">
      <button type="button" className={`v24-record-btn ${phase === 'listening' ? 'is-live' : ''}`} onClick={start} disabled={phase === 'listening' || !canRecognize}>
        {icons.mic}
        <span>{phase === 'listening' ? 'Đang nghe, hãy đọc to' : 'Nhấn để đọc theo'}</span>
      </button>
      {!canRecognize && <p className="v24-recorder-note">{errorMessages.unsupported}</p>}
      {error && <p className="v24-recorder-note is-error" role="alert">{error}</p>}
      {result && (
        <div className={`v24-score is-${verdict(result.score).tone}`} role="status">
          <strong>{result.score}%</strong>
          <span>{verdict(result.score).label}</span>
          <small>Hệ thống nghe được: “{result.heard || 'không rõ'}”</small>
        </div>
      )}
    </div>
  )
}

export function Pronunciation({ state, onScore }) {
  const [topic, setTopic] = useState(topics[0].id)
  const [index, setIndex] = useState(0)
  const words = useMemo(() => vocabulary.filter((item) => item.topic === topic), [topic])
  const word = words[index]

  const move = (step) => setIndex((value) => (value + step + words.length) % words.length)

  return (
    <div className="v24-subpage">
      <section className="v24-glass-panel">
        <div className="v24-panel-header">
          <div>
            <h2>Luyện phát âm</h2>
            <p>Nghe giọng đọc mẫu, rồi đọc theo bằng micro. Điểm được tính theo độ khớp giữa từ bạn đọc và từ mục tiêu.</p>
          </div>
          <span className="v24-count-pill">{Object.keys(state.pron).length} từ đã luyện</span>
        </div>

        <div className="v24-filter-pills" role="group" aria-label="Chọn chủ đề luyện phát âm">
          {topics.map((item) => (
            <button key={item.id} type="button" className={topic === item.id ? 'is-active' : ''} onClick={() => { setTopic(item.id); setIndex(0) }}>
              {item.name}
            </button>
          ))}
        </div>

        <div className="v24-pron-stage">
          <p className="v24-pron-count">Từ {index + 1} / {words.length}</p>
          <h3 className="v24-pron-word">{word.word}</h3>
          <span className="v24-word-phonetic">{word.ipa}</span>
          <p className="v24-pron-meaning">{word.meaning}</p>
          {state.pron[word.id] !== undefined && <span className="v24-count-pill">Điểm cao nhất: {state.pron[word.id]}%</span>}
          <div className="v24-result-actions">
            {canSpeak && (
              <>
                <button type="button" className="v24-pill-btn v24-pill-light" onClick={() => speak(word.word, 0.9)}>
                  {icons.volume}
                  <span>Nghe bình thường</span>
                </button>
                <button type="button" className="v24-pill-btn v24-pill-light" onClick={() => speak(word.word, 0.5)}>
                  {icons.volume}
                  <span>Nghe chậm</span>
                </button>
              </>
            )}
          </div>
          <Recorder key={word.id} target={word.word} onScore={(score) => onScore(word.id, score)} />
          <div className="v24-result-actions">
            <button type="button" className="v24-pill-btn v24-pill-light" onClick={() => move(-1)}>
              <span>Từ trước</span>
            </button>
            <button type="button" className="v24-pill-btn v24-pill-dark" onClick={() => move(1)}>
              <span>Từ tiếp theo</span>
              {icons.arrow}
            </button>
          </div>
        </div>
      </section>

      <section className="v24-glass-panel">
        <div className="v24-panel-header">
          <div>
            <h2>Cặp âm dễ nhầm</h2>
            <p>Nghe từng cặp từ để phân biệt âm dài, âm ngắn.</p>
          </div>
        </div>
        <div className="v24-pair-grid">
          {minimalPairs.map((pair) => (
            <article key={pair.a} className="v24-pair-card">
              <div className="v24-pair-words">
                {[[pair.a, pair.aIpa], [pair.b, pair.bIpa]].map(([text, ipa]) => (
                  <button key={text} type="button" className="v24-pair-word" onClick={() => speak(text, 0.7)} disabled={!canSpeak} aria-label={`Nghe từ ${text}`}>
                    <strong>{text}</strong>
                    <span>{ipa}</span>
                    {icons.volume}
                  </button>
                ))}
              </div>
              <p>{pair.tip}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
