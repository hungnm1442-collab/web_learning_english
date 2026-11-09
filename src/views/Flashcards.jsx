import { useCallback, useEffect, useState } from 'react'
import { vocabulary, vocabularyById, topics } from '../data/vocabulary'
import { icons } from '../components/icons'
import { speak, canSpeak } from '../lib/speech'

function buildQueue(state, stats) {
  const due = stats.dueIds.slice(0, 30)
  const fresh = vocabulary.filter((item) => !state.cards[item.id]).slice(0, stats.newToday).map((item) => item.id)
  return [...due, ...fresh]
}

const topicName = Object.fromEntries(topics.map((item) => [item.id, item.name]))

function Session({ queue: initialQueue, onReview, onExit }) {
  const [queue, setQueue] = useState(initialQueue)
  const [revealed, setRevealed] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const [forgotten, setForgotten] = useState(0)
  const total = initialQueue.length
  const current = queue.length ? vocabularyById[queue[0]] : null

  const rate = useCallback((rating) => {
    if (!current) return
    onReview(current.id, rating)
    setReviewed((value) => value + 1)
    setRevealed(false)
    if (rating === 'again') {
      setForgotten((value) => value + 1)
      setQueue((items) => [...items.slice(1), items[0]])
    } else {
      setQueue((items) => items.slice(1))
    }
  }, [current, onReview])

  useEffect(() => {
    const onKey = (event) => {
      if (!current) return
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault()
        setRevealed((value) => !value)
      }
      if (revealed && event.key === '1') rate('again')
      if (revealed && event.key === '2') rate('good')
      if (revealed && event.key === '3') rate('easy')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, revealed, rate])

  if (!current) {
    return (
      <section className="v24-glass-panel v24-result">
        <div className="v24-result-score is-pass">{reviewed}</div>
        <h2>Hoàn thành phiên ôn tập</h2>
        <p>Bạn đã ôn {total} thẻ, trong đó {forgotten} lần cần xem lại. Các thẻ sẽ quay lại đúng lúc bạn sắp quên.</p>
        <div className="v24-result-actions">
          <button type="button" className="v24-pill-btn v24-pill-dark" onClick={onExit}>
            <span>Về trang flashcard</span>
            {icons.arrow}
          </button>
        </div>
      </section>
    )
  }

  const done = total - queue.length

  return (
    <section className="v24-glass-panel v24-session">
      <div className="v24-player-top">
        <button type="button" className="v24-pill-btn v24-pill-light" onClick={onExit}>
          {icons.arrow}
          <span>Thoát phiên</span>
        </button>
        <span className="v24-count-pill">Còn {queue.length} thẻ</span>
      </div>
      <div className="v24-quiz-progress" role="progressbar" aria-valuemin="0" aria-valuemax={total} aria-valuenow={Math.max(done, 0)}>
        <span style={{ width: `${(Math.max(done, 0) / total) * 100}%` }} />
      </div>

      <button type="button" className={`v24-flip-card ${revealed ? 'is-revealed' : ''}`} onClick={() => setRevealed((value) => !value)} aria-label={revealed ? 'Ẩn nghĩa' : 'Hiện nghĩa'}>
        <span className="v24-flip-topic">{topicName[current.topic]}</span>
        <span className="v24-flip-word">{current.word}</span>
        <span className="v24-flip-ipa">{current.ipa}</span>
        {revealed ? (
          <>
            <span className="v24-flip-meaning">{current.meaning}</span>
            <span className="v24-flip-example">{current.example}</span>
          </>
        ) : (
          <span className="v24-flip-hint">Nhấn Space hoặc chạm để xem nghĩa</span>
        )}
      </button>

      {canSpeak && (
        <button type="button" className="v24-pill-btn v24-pill-light v24-speak-btn" onClick={() => speak(current.word)}>
          {icons.volume}
          <span>Nghe phát âm</span>
        </button>
      )}

      <div className={`v24-rate-row ${revealed ? '' : 'is-hidden'}`} aria-hidden={!revealed}>
        <button type="button" className="v24-rate is-again" disabled={!revealed} onClick={() => rate('again')}>
          <strong>Quên</strong><span>Xem lại sau ít phút · phím 1</span>
        </button>
        <button type="button" className="v24-rate is-good" disabled={!revealed} onClick={() => rate('good')}>
          <strong>Nhớ</strong><span>Ôn lại sau vài ngày · phím 2</span>
        </button>
        <button type="button" className="v24-rate is-easy" disabled={!revealed} onClick={() => rate('easy')}>
          <strong>Dễ</strong><span>Giãn khoảng ôn xa hơn · phím 3</span>
        </button>
      </div>
    </section>
  )
}

export function Flashcards({ state, stats, onReview }) {
  const [queue, setQueue] = useState(null)

  if (queue) {
    return (
      <div className="v24-subpage">
        <Session queue={queue} onReview={onReview} onExit={() => setQueue(null)} />
      </div>
    )
  }

  const pending = buildQueue(state, stats)

  return (
    <div className="v24-subpage">
      <section className="v24-subpage-hero">
        <div className="v24-subpage-copy">
          <div className="v24-status-pill">
            <span className="v24-status-dot" />
            <span>Ôn tập ngắt quãng</span>
          </div>
          <h2>{pending.length ? `${pending.length} thẻ đang chờ bạn hôm nay` : 'Bạn đã ôn xong hôm nay'}</h2>
          <p>
            {pending.length
              ? `${stats.dueCount} thẻ đến hạn ôn và ${pending.length - Math.min(stats.dueCount, 30)} từ mới. Đánh giá thành thật để thuật toán xếp lịch ôn chính xác.`
              : 'Quay lại vào ngày mai, hoặc chọn thêm từ mới trong kho từ vựng.'}
          </p>
          <button type="button" className="v24-btn-white" disabled={!pending.length} onClick={() => setQueue(pending)}>
            <span>Bắt đầu ôn tập</span>
            {icons.arrowUpRight}
          </button>
        </div>
        <div className="v24-subpage-stats">
          <div><strong>{stats.learned}</strong><span>Từ đã học</span></div>
          <div><strong>{stats.mastered}</strong><span>Đã thuộc</span></div>
          <div><strong>{stats.streak}</strong><span>Ngày liên tiếp</span></div>
        </div>
      </section>

      <section className="v24-glass-panel">
        <div className="v24-panel-header">
          <div>
            <h2>Cách hoạt động</h2>
            <p>Mỗi thẻ nằm trong một hộp ôn từ 1 đến 6. Khi bạn nhớ, thẻ lên hộp cao hơn và lâu hơn mới quay lại.</p>
          </div>
        </div>
        <div className="v24-box-row">
          {[['Hộp 1', 'Sau 1 ngày'], ['Hộp 2', 'Sau 2 ngày'], ['Hộp 3', 'Sau 4 ngày'], ['Hộp 4', 'Sau 7 ngày'], ['Hộp 5', 'Sau 14 ngày'], ['Hộp 6', 'Sau 30 ngày']].map(([name, gap], index) => (
            <div key={name} className="v24-box-step">
              <strong>{name}</strong>
              <span>{gap}</span>
              <small>{Object.values(state.cards).filter((card) => card.box === index + 1).length} thẻ</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
