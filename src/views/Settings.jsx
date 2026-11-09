import { useState } from 'react'

export function Settings({ session, state, onSettings, onReset, onSignOut }) {
  const [confirming, setConfirming] = useState(false)
  const email = session?.user?.email || 'Chưa đăng nhập'
  const { dailyGoal, newPerDay } = state.settings

  return (
    <div className="v24-subpage">
      <section className="v24-glass-panel v24-settings-card">
        <div className="v24-settings-profile">
          <div className="v24-large-avatar">{email.slice(0, 2).toUpperCase()}</div>
          <div>
            <h2>{session ? email.split('@')[0] : 'Khách học'}</h2>
            <p>{session ? `${email} · Tiến độ đồng bộ qua Supabase` : 'Tiến độ đang lưu trên trình duyệt này. Đăng nhập để học trên nhiều thiết bị.'}</p>
          </div>
          <button type="button" className="v24-pill-btn v24-pill-dark" onClick={onSignOut}>
            {session ? 'Đăng xuất' : 'Đăng nhập đồng bộ'}
          </button>
        </div>

        <div className="v24-settings-list">
          <label className="v24-setting-row">
            <span>
              <strong>Mục tiêu ôn thẻ mỗi ngày</strong>
              <small>Số lượt ôn flashcard bạn muốn hoàn thành mỗi ngày</small>
            </span>
            <select value={dailyGoal} onChange={(event) => onSettings({ dailyGoal: Number(event.target.value) })}>
              {[5, 10, 20, 30].map((value) => <option key={value} value={value}>{value} thẻ</option>)}
            </select>
          </label>
          <label className="v24-setting-row">
            <span>
              <strong>Từ mới mỗi ngày</strong>
              <small>Giới hạn từ mới để việc ôn tập không bị quá tải</small>
            </span>
            <select value={newPerDay} onChange={(event) => onSettings({ newPerDay: Number(event.target.value) })}>
              {[3, 5, 8, 12, 20].map((value) => <option key={value} value={value}>{value} từ</option>)}
            </select>
          </label>
          <div className="v24-setting-row">
            <span>
              <strong>Xóa toàn bộ tiến độ</strong>
              <small>Đặt lại bài học, flashcard, chuỗi ngày và điểm phát âm. Không thể hoàn tác.</small>
            </span>
            {confirming ? (
              <span className="v24-confirm-row">
                <button type="button" className="v24-pill-btn v24-pill-light" onClick={() => setConfirming(false)}>Hủy</button>
                <button type="button" className="v24-pill-btn v24-pill-dark" onClick={() => { onReset(); setConfirming(false) }}>Xác nhận xóa</button>
              </span>
            ) : (
              <button type="button" className="v24-pill-btn v24-pill-light" onClick={() => setConfirming(true)}>Xóa tiến độ</button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
