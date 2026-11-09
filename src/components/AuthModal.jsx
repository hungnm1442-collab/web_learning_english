import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { icons } from './icons'

function getAuthErrorMessage(error) {
  if (error?.code === 'over_email_send_rate_limit' || error?.message?.toLowerCase().includes('email rate limit')) {
    return 'Supabase đang giới hạn email xác nhận. Hãy đợi một lúc rồi thử lại, hoặc tắt Confirm email khi chỉ đang thử nghiệm.'
  }
  if (error?.message?.toLowerCase().includes('user already registered')) {
    return 'Email này đã có tài khoản. Hãy chuyển sang Đăng nhập.'
  }
  if (error?.message?.toLowerCase().includes('invalid login credentials')) {
    return 'Email hoặc mật khẩu chưa đúng.'
  }
  return error instanceof Error ? error.message : 'Không thể kết nối Supabase.'
}


export function AuthModal({ onClose, onAuthenticated }) {
  const [mode, setMode] = useState('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const submit = async (event) => {
    event.preventDefault()
    if (!supabase) {
      setStatus({ type: 'error', message: 'Supabase chưa được cấu hình trong môi trường hiện tại.' })
      return
    }

    setStatus({ type: 'loading', message: '' })
    let response
    try {
      response = mode === 'sign-in'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })
    } catch (error) {
      setStatus({ type: 'error', message: getAuthErrorMessage(error) })
      return
    }

    if (response.error) {
      setStatus({ type: 'error', message: getAuthErrorMessage(response.error) })
      return
    }

    if (mode === 'sign-up' && !response.data.session) {
      setStatus({ type: 'success', message: 'Kiểm tra email để xác nhận tài khoản trước khi đăng nhập.' })
      return
    }

    const profile = await supabase.from('profiles').upsert({ id: response.data.session.user.id, display_name: email.split('@')[0] })
    if (profile.error) {
      setStatus({ type: 'error', message: 'Đăng nhập được nhưng chưa lưu được hồ sơ. Hãy kiểm tra schema Supabase.' })
      return
    }
    onAuthenticated(response.data.session)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Đóng">{icons.close}</button>
        <div className="modal-pill-badge">Tài khoản học tập LingoLy</div>
        <h2>{mode === 'sign-in' ? 'Chào mừng bạn quay lại' : 'Tạo tài khoản học tập'}</h2>
        <p className="auth-copy">Lưu tiến độ bài học và bộ thẻ từ vựng trên mọi thiết bị.</p>
        <form onSubmit={submit} className="auth-form">
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
          </label>
          <label>
            Mật khẩu
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength="6" autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'} />
          </label>
          {status.message && <p className={`auth-status ${status.type}`}>{status.message}</p>}
          <button className="primary-button auth-submit" disabled={status.type === 'loading'}>
            {status.type === 'loading' ? 'Đang xử lý...' : mode === 'sign-in' ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>
        <button
          className="auth-switch"
          onClick={() => {
            setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')
            setStatus({ type: 'idle', message: '' })
          }}
        >
          {mode === 'sign-in' ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
        </button>
      </div>
    </div>
  )
}

