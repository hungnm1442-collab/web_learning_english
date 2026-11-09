import { useEffect, useState } from 'react'
import { animate } from 'animejs'

export function LandingPage({ onStart, onAuth }) {
  const [promoVisible, setPromoVisible] = useState(false)

  useEffect(() => {
    animate('.landing-hero-copy', { opacity: [0, 1], translateY: [22, 0], duration: 720, ease: 'out(4)' })
    animate('.landing-visual', { opacity: [0, 1], translateX: [26, 0], duration: 820, delay: 120, ease: 'out(4)' })
    const revealPromo = () => setPromoVisible(window.scrollY > window.innerHeight * 0.45)
    window.addEventListener('scroll', revealPromo, { passive: true })
    return () => {
      window.removeEventListener('scroll', revealPromo)
    }
  }, [])

  return (
    <div className="landing-page">
      <header className="landing-header">
        <button className="landing-logo" onClick={onStart} aria-label="Mở LingoLy"><span>L</span>LingoLy</button>
        <nav className="landing-nav" aria-label="Điều hướng website">
          <button className="landing-nav-active" onClick={onStart}>Trang chủ</button>
          <button onClick={onStart}>Blog</button>
          <button onClick={onStart}>Hướng Dẫn Học</button>
          <button onClick={onStart}>Về Chúng Tôi</button>
          <button className="landing-login" onClick={onAuth}>Đăng nhập</button>
          <button className="landing-header-cta" onClick={onStart}>Bắt Đầu</button>
        </nav>
      </header>
      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero-copy">
            <div className="landing-pill"><span>✦</span> Tiếng Anh cho người Việt · 2026</div>
            <h1>Học tiếng Anh<br /><mark>tự tin hơn</mark><br />mỗi ngày.</h1>
            <p>Học từ vựng, phát âm và ngữ pháp theo cách dễ hiểu, sinh động. Mỗi ngày một bài nhỏ, để bạn tiến bộ thật đều.</p>
            <div className="landing-actions">
              <button className="landing-primary-cta" onClick={onStart}>Học tiếng Anh miễn phí <span>→</span></button>
              <button className="landing-secondary-cta" onClick={onStart}>Xem lộ trình</button>
            </div>
            <div className="landing-proof">
              <div><strong>4</strong><span>Kỹ năng<br />cốt lõi</span></div>
              <div><strong>15′</strong><span>Mỗi bài học<br />mỗi ngày</span></div>
              <div><strong>0đ</strong><span>Bắt đầu<br />miễn phí</span></div>
            </div>
          </div>
          <div className="landing-visual" aria-label="Minh hoạ học tiếng Anh trên máy tính và điện thoại">
            <div className="visual-sun" />
            <div className="laptop">
              <div className="laptop-screen">
                <div className="screen-top"><span className="screen-dot" /><span /><span /></div>
                <div className="screen-sidebar"><b>L</b><i /><i /><i /></div>
                <div className="screen-content"><small>HÔM NAY MÌNH HỌC GÌ?</small><strong>Present simple</strong><div className="screen-line" /><div className="screen-row"><span /><i /><b /></div><div className="screen-row"><span /><i /><b /></div></div>
              </div>
              <div className="laptop-base" />
            </div>
            <div className="phone">
              <div className="phone-speaker" />
              <div className="phone-screen"><small>LINGOLY</small><h3>Speak with<br /><em>confidence.</em></h3><div className="voice-wave"><i /><i /><i /><i /><i /><i /><i /><i /></div><span className="phone-button">Bắt đầu nói&nbsp; →</span></div>
            </div>
            <span className="visual-star star-a">✦</span><span className="visual-star star-b">✦</span>
          </div>
        </section>
        <section className="landing-editorial landing-reveal">
          <div className="editorial-copy">
            <span className="editorial-script">Xin chào, mình là</span>
            <h2>Một góc học<br /><em>thật dễ chịu</em></h2>
            <p>Không cần học thật nhiều trong một ngày. LingoLy biến mỗi 15 phút thành một bước nhỏ, rõ ràng và vui hơn.</p>
            <button className="landing-primary-cta" onClick={onStart}>Khám phá lộ trình <span>→</span></button>
          </div>
          <div className="editorial-collage" aria-label="Minh hoạ các hoạt động học tiếng Anh">
            <div className="polaroid polaroid-one"><span className="collage-orbit">A</span><strong>Vocabulary</strong><small>5 từ mới hôm nay</small></div>
            <div className="polaroid polaroid-two"><span className="collage-speech">hello<br /><i>there!</i></span><strong>Speaking</strong><small>Nói tự tin hơn</small></div>
          </div>
        </section>
        <section className="landing-gallery landing-reveal">
          <div className="gallery-heading"><div><span className="editorial-script">Chọn nhịp học của bạn</span><h2>Học một chút,<br /><em>tiến bộ thật.</em></h2></div><p>Bốn kỹ năng, một hành trình<br />được thiết kế cho người Việt.</p></div>
          <div className="gallery-grid">
            <button className="gallery-card gallery-card-olive" onClick={onStart}><span className="gallery-badge">✦ NEW</span><strong>Words<br />that stick</strong><small>Từ vựng</small></button>
            <button className="gallery-card gallery-card-pink" onClick={onStart}><span className="gallery-badge">🔥 HOT</span><strong>Speak<br />with ease</strong><small>Phát âm</small></button>
            <button className="gallery-card gallery-card-blue" onClick={onStart}><strong>Grammar<br />made clear</strong><small>Ngữ pháp</small></button>
          </div>
        </section>
        <div className="landing-bottom-note"><span>Học đều, tiến bộ mỗi ngày.</span><span>Được thiết kế cho người Việt</span></div>
      </main>
      {promoVisible && <div className="scroll-promo"><div className="promo-art"><span>15′</span><i>✦</i></div><div><strong>Học thử miễn phí</strong><p>Bắt đầu bài học đầu tiên ngay hôm nay.</p></div><button onClick={onStart} aria-label="Bắt đầu học thử">→</button><button className="promo-close" onClick={() => setPromoVisible(false)} aria-label="Đóng quảng cáo">×</button></div>}
    </div>
  )
}

