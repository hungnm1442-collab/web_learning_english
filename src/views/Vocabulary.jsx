import { useMemo, useState } from 'react'
import { topics, vocabulary } from '../data/vocabulary'
import { getWordStatus } from '../lib/progress'
import { icons } from '../components/icons'
import { speak, canSpeak } from '../lib/speech'

const statusLabels = {
  new: 'Chưa học',
  learning: 'Đang học',
  due: 'Cần ôn',
  mastered: 'Đã thuộc',
}

const statusFilters = [
  ['all', 'Tất cả'],
  ['new', 'Chưa học'],
  ['learning', 'Đang học'],
  ['due', 'Cần ôn'],
  ['mastered', 'Đã thuộc'],
]

export function Vocabulary({ state, stats, query, onQueryChange, onStudy }) {
  const [topic, setTopic] = useState('all')
  const [status, setStatus] = useState('all')

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return vocabulary.filter((item) => {
      if (topic !== 'all' && item.topic !== topic) return false
      if (status !== 'all' && getWordStatus(state.cards[item.id], stats.today) !== status) return false
      if (!needle) return true
      return item.word.includes(needle) || item.meaning.toLowerCase().includes(needle)
    })
  }, [query, topic, status, state.cards, stats.today])

  return (
    <div className="v24-subpage">
      <section className="v24-glass-panel">
        <div className="v24-panel-header">
          <div>
            <h2>Kho từ vựng</h2>
            <p>{vocabulary.length} từ theo {topics.length} chủ đề. Nhấn loa để nghe phát âm chuẩn.</p>
          </div>
          <button type="button" className="v24-pill-btn v24-pill-dark" onClick={onStudy}>
            {icons.cards}
            <span>Học bằng flashcard</span>
          </button>
        </div>

        <label className="v24-field-search">
          {icons.search}
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Tìm theo từ tiếng Anh hoặc nghĩa tiếng Việt"
            aria-label="Tìm từ vựng"
          />
        </label>

        <div className="v24-filter-pills" role="group" aria-label="Lọc theo chủ đề">
          <button type="button" className={topic === 'all' ? 'is-active' : ''} onClick={() => setTopic('all')}>Mọi chủ đề</button>
          {topics.map((item) => (
            <button key={item.id} type="button" className={topic === item.id ? 'is-active' : ''} onClick={() => setTopic(item.id)}>
              {item.name}
            </button>
          ))}
        </div>
        <div className="v24-filter-pills v24-filter-status" role="group" aria-label="Lọc theo trạng thái">
          {statusFilters.map(([id, label]) => (
            <button key={id} type="button" className={status === id ? 'is-active' : ''} onClick={() => setStatus(id)}>{label}</button>
          ))}
          <span className="v24-count-pill">{items.length} từ</span>
        </div>

        {items.length ? (
          <div className="v24-word-grid">
            {items.map((item) => {
              const itemStatus = getWordStatus(state.cards[item.id], stats.today)
              return (
                <article key={item.id} className="v24-word-card v24-word-static">
                  <div className="v24-word-card-top">
                    <span className="v24-word-type">{item.type}</span>
                    <span className={`v24-row-status ${itemStatus === 'mastered' ? 'is-mastered' : ''}`}>{statusLabels[itemStatus]}</span>
                  </div>
                  <div className="v24-word-line">
                    <strong>{item.word}</strong>
                    {canSpeak && (
                      <button type="button" className="v24-icon-btn" aria-label={`Nghe từ ${item.word}`} onClick={() => speak(item.word)}>
                        {icons.volume}
                      </button>
                    )}
                  </div>
                  <span className="v24-word-phonetic">{item.ipa}</span>
                  <p>{item.meaning}</p>
                  <em className="v24-word-example">{item.example}</em>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="v24-empty-state">
            <strong>Không tìm thấy từ phù hợp</strong>
            <small>Thử đổi từ khóa hoặc chọn lại bộ lọc.</small>
          </div>
        )}
      </section>
    </div>
  )
}
