import { useState } from 'react'
import { lessons, lessonsById } from '../data/lessons'
import { icons } from '../components/icons'
import { speak, canSpeak } from '../lib/speech'

function LessonList({ state, onSelect }) {
  return (
    <div className="v24-subpage">
      <section className="v24-glass-panel">
        <div className="v24-panel-header">
          <div>
            <h2>Bài học ngữ pháp</h2>
            <p>Mỗi bài gồm phần giải thích, ví dụ song ngữ và 5 câu bài tập. Đạt từ 60% để hoàn thành.</p>
          </div>
          <span className="v24-count-pill">
            {lessons.filter((lesson) => state.lessons[lesson.id]?.done).length}/{lessons.length} bài
          </span>
        </div>
        <div className="v24-lesson-grid">
          {lessons.map((lesson, index) => {
            const record = state.lessons[lesson.id]
            return (
              <button key={lesson.id} type="button" className="v24-lesson-card" onClick={() => onSelect(lesson.id)}>
                <div className="v24-lesson-card-top">
                  <span className="v24-lesson-index">{index + 1}</span>
                  <span className={`v24-row-status ${record?.done ? 'is-mastered' : ''}`}>
                    {record?.done ? `Hoàn thành · ${record.best}%` : record ? `Đã thử · ${record.best}%` : 'Chưa học'}
                  </span>
                </div>
                <strong>{lesson.title}</strong>
                <p>{lesson.summary}</p>
                <div className="v24-lesson-meta">
                  <span>{lesson.level}</span>
                  <span>{lesson.minutes} phút</span>
                  <span>{lesson.quiz.length} câu hỏi</span>
                </div>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function LessonPlayer({ lesson, previous, onBack, onFinish, onSelect }) {
  const [stage, setStage] = useState('read')
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)

  const total = lesson.quiz.length
  const question = lesson.quiz[index]
  const nextLesson = lessons[lessons.findIndex((item) => item.id === lesson.id) + 1]

  const startQuiz = () => {
    setIndex(0)
    setPicked(null)
    setScore(0)
    setStage('quiz')
  }

  const choose = (option) => {
    if (picked !== null) return
    setPicked(option)
    if (option === question.answer) setScore((value) => value + 1)
  }

  const advance = () => {
    if (index < total - 1) {
      setIndex(index + 1)
      setPicked(null)
      return
    }
    onFinish(lesson.id, score, total)
    setStage('result')
  }

  const percent = Math.round((score / total) * 100)

  return (
    <div className="v24-subpage">
      <section className="v24-glass-panel v24-player">
        <div className="v24-player-top">
          <button type="button" className="v24-pill-btn v24-pill-light" onClick={onBack}>
            {icons.arrow}
            <span>Danh sách bài học</span>
          </button>
          <span className="v24-count-pill">{lesson.level} · {lesson.minutes} phút</span>
        </div>

        {stage === 'read' && (
          <>
            <h2 className="v24-player-title">{lesson.title}</h2>
            <p className="v24-player-summary">{lesson.summary}</p>
            {lesson.sections.map((section) => (
              <div key={section.heading} className="v24-lesson-section">
                <h3>{section.heading}</h3>
                <p>{section.body}</p>
                <ul>
                  {section.examples.map(([en, vi]) => (
                    <li key={en}>
                      <div>
                        <strong>{en}</strong>
                        <span>{vi}</span>
                      </div>
                      {canSpeak && (
                        <button type="button" className="v24-icon-btn" aria-label={`Nghe câu ${en}`} onClick={() => speak(en)}>
                          {icons.volume}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button type="button" className="primary-button v24-player-cta" onClick={startQuiz}>
              Làm bài tập ({total} câu) {icons.arrow}
            </button>
          </>
        )}

        {stage === 'quiz' && (
          <div className="v24-quiz">
            <div className="v24-quiz-progress" role="progressbar" aria-valuemin="0" aria-valuemax={total} aria-valuenow={index + 1}>
              <span style={{ width: `${((index + 1) / total) * 100}%` }} />
            </div>
            <p className="v24-quiz-count">Câu {index + 1} / {total}</p>
            <h2 className="v24-quiz-question">{question.question}</h2>
            <div className="v24-quiz-options">
              {question.options.map((option, optionIndex) => {
                const state = picked === null ? '' : optionIndex === question.answer ? 'is-correct' : picked === optionIndex ? 'is-wrong' : 'is-dim'
                return (
                  <button key={option} type="button" className={`v24-quiz-option ${state}`} disabled={picked !== null} onClick={() => choose(optionIndex)}>
                    <span>{String.fromCharCode(65 + optionIndex)}</span>
                    {option}
                  </button>
                )
              })}
            </div>
            {picked !== null && (
              <div className={`v24-quiz-feedback ${picked === question.answer ? 'is-correct' : 'is-wrong'}`} role="status">
                <strong>{picked === question.answer ? 'Chính xác' : 'Chưa đúng'}</strong>
                <span>{question.explain}</span>
                <button type="button" className="primary-button" onClick={advance}>
                  {index < total - 1 ? 'Câu tiếp theo' : 'Xem kết quả'} {icons.arrow}
                </button>
              </div>
            )}
          </div>
        )}

        {stage === 'result' && (
          <div className="v24-result">
            <div className={`v24-result-score ${percent >= 60 ? 'is-pass' : ''}`}>{percent}%</div>
            <h2>{percent >= 60 ? 'Bạn đã hoàn thành bài học' : 'Gần được rồi, thử lại nhé'}</h2>
            <p>
              Bạn trả lời đúng {score}/{total} câu.{' '}
              {previous && previous.best > percent ? `Kết quả tốt nhất của bạn vẫn là ${previous.best}%.` : ''}
            </p>
            <div className="v24-result-actions">
              <button type="button" className="v24-pill-btn v24-pill-light" onClick={() => setStage('read')}>
                {icons.book}
                <span>Đọc lại bài</span>
              </button>
              <button type="button" className="v24-pill-btn v24-pill-light" onClick={startQuiz}>
                {icons.repeat}
                <span>Làm lại bài tập</span>
              </button>
              {nextLesson && percent >= 60 && (
                <button type="button" className="v24-pill-btn v24-pill-dark" onClick={() => onSelect(nextLesson.id)}>
                  <span>Bài tiếp theo</span>
                  {icons.arrow}
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export function Lessons({ state, activeId, onSelect, onComplete }) {
  const lesson = activeId ? lessonsById[activeId] : null
  if (!lesson) return <LessonList state={state} onSelect={onSelect} />
  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      previous={state.lessons[lesson.id]}
      onBack={() => onSelect(null)}
      onFinish={onComplete}
      onSelect={onSelect}
    />
  )
}
