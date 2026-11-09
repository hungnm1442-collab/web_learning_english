import { lessons } from '../data/lessons'
import { icons } from '../components/icons'

function sparkPath(values) {
  const max = Math.max(...values, 1)
  const step = 108 / (values.length - 1)
  return values
    .map((value, index) => `${index === 0 ? 'M' : 'L'} ${(2 + index * step).toFixed(1)} ${(32 - (value / max) * 28).toFixed(1)}`)
    .join(' ')
}

function Sparkline({ values, tone }) {
  const path = sparkPath(values)
  return (
    <svg className={`v24-sparkline is-${tone}`} viewBox="0 0 112 36" aria-hidden="true">
      <path className="v24-sparkline-area" d={`${path} L 110 34 L 2 34 Z`} />
      <path className="v24-sparkline-line" d={path} />
    </svg>
  )
}

const weekdayShort = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

export function Dashboard({ state, stats, onNavigate, onOpenLesson }) {
  const nextLesson = lessons.find((lesson) => !state.lessons[lesson.id]?.done) || lessons[0]
  const allDone = stats.doneLessons === stats.totalLessons
  const now = new Date(`${stats.today}T00:00:00`)
  const radius = 64
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (stats.pathProgress / 100) * circumference
  const activity = stats.last7.map((day) => day.count)
  const goal = state.settings.dailyGoal
  const reviewable = stats.dueCount + stats.newToday

  const tasks = [
    {
      key: 'cards',
      icon: icons.cards,
      title: reviewable ? `Ôn ${reviewable} thẻ từ vựng` : 'Đã ôn xong hôm nay',
      sub: `${stats.dueCount} đến hạn · ${stats.newToday} từ mới`,
      badge: `${stats.todayDaily.cards}/${goal}`,
      tone: 'wine',
      action: () => onNavigate('flashcards'),
    },
    {
      key: 'lesson',
      icon: icons.book,
      title: allDone ? 'Xem lại bài đã học' : nextLesson.title,
      sub: `${nextLesson.category} · ${nextLesson.minutes} phút`,
      badge: allDone ? 'Hoàn tất' : nextLesson.level,
      tone: 'blue',
      action: () => onOpenLesson(nextLesson.id),
    },
    {
      key: 'pron',
      icon: icons.mic,
      title: 'Luyện phát âm 5 từ',
      sub: 'Nghe mẫu và đọc theo',
      badge: `${Object.keys(state.pron).length} từ`,
      tone: 'blush',
      action: () => onNavigate('pronunciation'),
    },
    {
      key: 'vocab',
      icon: icons.search,
      title: 'Khám phá kho từ vựng',
      sub: `${stats.total} từ theo 10 chủ đề`,
      badge: `${stats.learned}/${stats.total}`,
      tone: 'blue',
      action: () => onNavigate('vocabulary'),
    },
  ]

  const kpis = [
    { title: 'Từ vựng đã học', value: `${stats.learned}`, note: `trên ${stats.total} từ`, icon: icons.book, tone: 'blue', action: () => onNavigate('vocabulary') },
    { title: 'Từ đã thuộc', value: `${stats.mastered}`, note: 'hộp ôn từ 4 trở lên', icon: icons.check, tone: 'wine', action: () => onNavigate('flashcards') },
    { title: 'Chuỗi ngày học', value: `${stats.streak} ngày`, note: stats.streak ? 'Giữ nhịp học mỗi ngày' : 'Học hôm nay để bắt đầu chuỗi', icon: icons.flame, tone: 'light', accent: true, action: () => onNavigate('flashcards') },
    { title: 'Bài học hoàn thành', value: `${stats.doneLessons}/${stats.totalLessons}`, note: 'đạt từ 60% bài tập', icon: icons.trophy, tone: 'blue', action: () => onNavigate('lessons') },
  ]

  return (
    <div className="v24-bento-shell">
      <section className="v24-upper-grid" aria-label="Tổng quan tiến độ">
        <article className="v24-hero-card">
          <div className="v24-hero-copy">
            <div className="v24-status-pill">
              <span className="v24-status-dot" />
              <span>{stats.todayDaily.cards >= goal ? 'Đã đạt mục tiêu hôm nay' : `Mục tiêu hôm nay: ${stats.todayDaily.cards}/${goal} thẻ`}</span>
            </div>
            <h2>
              {stats.streak ? <>Nhịp học của bạn đang <em>rất đều</em></> : <>Hôm nay là ngày <em>bắt đầu</em> tốt</>}
            </h2>
            <p>
              {stats.pathProgress}% lộ trình ngữ pháp đã hoàn thành. {reviewable ? `Có ${reviewable} thẻ từ vựng đang chờ bạn.` : 'Bạn đã ôn hết thẻ hôm nay.'}
            </p>
            <div className="v24-hero-metrics">
              <div><strong>{stats.dueCount}</strong><span>từ cần ôn</span></div>
              <div><strong>{stats.streak}</strong><span>ngày liên tiếp</span></div>
              <div><strong>{stats.mastered}</strong><span>từ đã thuộc</span></div>
            </div>
            <div className="v24-hero-actions">
              <button className="v24-btn-white" onClick={() => onOpenLesson(nextLesson.id)}>
                <span>{allDone ? 'Ôn lại bài học' : 'Học bài tiếp theo'}</span>
                {icons.arrowUpRight}
              </button>
              <button className="v24-btn-translucent" onClick={() => onNavigate('flashcards')}>
                {icons.cards}
                <span>Ôn flashcard</span>
              </button>
            </div>
          </div>

          <div className="v24-gauge-stage" role="img" aria-label={`Tiến độ lộ trình ${stats.pathProgress}%`}>
            <div className="v24-orbit-ring">
              <svg className="v24-gauge-svg" viewBox="0 0 168 168">
                <circle className="v24-gauge-orbit-Guide" cx="84" cy="84" r="76" />
                <circle className="v24-gauge-track" cx="84" cy="84" r={radius} />
                <circle className="v24-gauge-fill" cx="84" cy="84" r={radius} strokeDasharray={circumference} strokeDashoffset={offset} />
              </svg>
              <div className="v24-gauge-center">
                <strong>{stats.pathProgress}%</strong>
                <span>lộ trình ngữ pháp</span>
              </div>
            </div>
          </div>
        </article>

        <aside className="v24-schedule-card" aria-label="Việc cần làm hôm nay">
          <div className="v24-schedule-header">
            <div className="v24-date-display">
              <span className="v24-date-number">{String(now.getDate()).padStart(2, '0')}</span>
              <div className="v24-date-meta">
                <strong>{now.toLocaleDateString('vi-VN', { weekday: 'long' })}</strong>
                <span>Tháng {now.getMonth() + 1}, {now.getFullYear()}</span>
              </div>
            </div>
          </div>

          <div className="v24-week-strip" aria-label="Hoạt động 7 ngày gần nhất">
            {stats.last7.map((day) => {
              const date = new Date(`${day.key}T00:00:00`)
              return (
                <div key={day.key} className={`v24-day-pill ${day.isToday ? 'is-active' : ''} ${day.active ? 'is-done' : ''}`}>
                  <small>{weekdayShort[date.getDay()]}</small>
                  <strong>{String(date.getDate()).padStart(2, '0')}</strong>
                  <i className="v24-day-dot" />
                </div>
              )
            })}
          </div>

          <div className="v24-lesson-schedule">
            {tasks.map((task) => (
              <button key={task.key} type="button" className="v24-schedule-item" onClick={task.action}>
                <span className="v24-schedule-time">{task.icon}</span>
                <span className="v24-schedule-info">
                  <strong>{task.title}</strong>
                  <small>{task.sub}</small>
                </span>
                <span className={`v24-schedule-badge tone-${task.tone}`}>{task.badge}</span>
              </button>
            ))}
          </div>
        </aside>
      </section>

      <section className="v24-kpi-grid" aria-label="Chỉ số học tập">
        {kpis.map((card) => (
          <button key={card.title} type="button" className={`v24-kpi-card ${card.accent ? 'is-accent' : ''}`} onClick={card.action}>
            <div className="v24-kpi-top">
              <span className="v24-kpi-icon">{card.icon}</span>
            </div>
            <div className="v24-kpi-value">{card.value}</div>
            <div className="v24-kpi-bottom">
              <div className="v24-kpi-labels">
                <strong>{card.title}</strong>
                <span>{card.note}</span>
              </div>
              <Sparkline values={activity} tone={card.tone} />
            </div>
          </button>
        ))}
      </section>
    </div>
  )
}
