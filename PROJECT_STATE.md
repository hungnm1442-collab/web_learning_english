# TRẠNG THÁI, TIẾN ĐỘ & TRÍ NHỚ DỰ ÁN (PROJECT STATE & MEMORY HARNESS)

> **Áp dụng cho:** Mọi AI Coding Agent (Cursor, Windsurf, Copilot, Cline, Roo Code, Claude Code...)
> **Vị trí:** `PROJECT_STATE.md`
> **Mục tiêu:** Đóng vai trò là "Bộ nhớ dài hạn" của dự án LingoLy và kết xuất file tóm tắt bàn giao (`SESSION_HANDOFF.md`).

---

## 1. QUY TẮC TỰ ĐỘNG SINH FILE BÀN GIAO PHIÊN CHAT (`SESSION_HANDOFF.md`)

Mỗi khi hoàn thành một tính năng quan trọng hoặc khi kết thúc phiên làm việc, AI tự động cập nhật `SESSION_HANDOFF.md` ở thư mục gốc của dự án.

---

## 2. BẢNG THEO DÕI TIẾN ĐỘ TỔNG THỂ (MASTER PROGRESS TRACKER)

### Tổng quan dự án
* **Tên dự án:** **LingoLy**
* **Mục tiêu cốt lõi:** Website tự học tiếng Anh learner-first cho người Việt (từ vựng, ngữ pháp, phát âm, flashcard), xây dựng bằng React 19 + Vite + Supabase.
* **Giai đoạn hiện tại:** Hoàn thiện toàn bộ tính năng học tập tương tác & sẵn sàng phát hành lên GitHub.

### Danh sách tính năng (Feature Roadmap)
- [x] **Khởi tạo dự án & Cấu hình cơ bản:** Setup React 19 + Vite 8, Oxlint, kết nối Supabase (`src/lib/supabase.js`, `supabase/schema.sql`, `supabase/seed.sql`).
- [x] **Trang giới thiệu (`src/components/LandingPage.jsx`):** Thiết kế phong cách Editorial ấm áp với bảng màu Đỏ rượu (`#8d1e32`) + Hồng phấn (`#e8a9b9`) + Xanh trầm (`#46658b`) + Kem (`#fffaf7`).
- [x] **Khu vực Học tập phong cách Glassy Dashboard V24 (`.v24-workspace`):**
  - [x] Thanh điều hướng kính mờ nổi (`Floating Frosted Sidebar`) với tìm kiếm nhanh bài học/từ vựng và thẻ hồ sơ học viên.
  - [x] Trang **Tổng quan học tập (`src/views/Dashboard.jsx`)** theo bố cục Bento Grid: Thẻ Hero Đỏ rượu kèm vòng tròn tiến độ, lịch hoạt động 7 ngày, bài học tiếp theo và 4 thẻ chỉ số KPI.
  - [x] Trang **Bài học (`src/views/Lessons.jsx` & `src/data/lessons.js`):** 10 bài ngữ pháp A1–A2 có lý thuyết song ngữ, nghe phát âm câu ví dụ và bài trắc nghiệm 5 câu.
  - [x] Trang **Từ vựng (`src/views/Vocabulary.jsx` & `src/data/vocabulary.js`):** 100 từ vựng theo 10 chủ đề đời sống kèm tìm kiếm, lọc trạng thái và nghe phát âm.
  - [x] Trang **Flashcard (`src/views/Flashcards.jsx`):** Hệ thống ôn tập ngắt quãng 6 hộp (Leitner SRS) với 3 mức đánh giá (`Chưa nhớ`, `Nhớ được`, `Quá dễ`).
  - [x] Trang **Phát âm (`src/views/Pronunciation.jsx` & `src/lib/speech.js`):** Nghe giọng mẫu thường/chậm, thu âm qua Micro chấm điểm phát âm và luyện 5 cặp âm tối thiểu (Minimal Pairs).
  - [x] Trang **Cài đặt (`src/views/Settings.jsx`):** Tùy chỉnh mục tiêu thẻ/ngày, số từ mới/ngày, đặt lại tiến độ và quản lý đăng nhập.
- [x] **Đồng bộ & Cô lập tiến độ đa tài khoản (`src/lib/progress.js` & `supabase/schema.sql`):** Mỗi tài khoản có khóa `localStorage` riêng (`lingoly:progress:v2:user:<userId>`) và đồng bộ đám mây qua bảng `public.user_state` trên Supabase.

---

## 3. LƯU Ý CỐ ĐỊNH CỦA NGƯỜI YÊU CẦU & ĐẶC THÙ DỰ ÁN (PERMANENT NOTES)

### 3.1. Lưu ý từ Người yêu cầu (Owner's Directives)
* **Ngôn ngữ giao tiếp:** 100% bằng Tiếng Việt.
* **Tự động quét và áp dụng Skills:** Luôn quét `.ai/skills/` (như `impeccable` cho UI/UX và `debugging-playbook.md` khi xử lý lỗi) trước khi thực hiện yêu cầu.
* **Sở thích thẩm mỹ & Bảng màu:** Giữ nguyên `LandingPage` và bảo tồn bảng màu đặc trưng **Đỏ rượu (`#8d1e32` / `#681426`) + Xanh trầm (`#46658b` / `#9db8d3`) + Be/Kem (`#ede0d7` / `#fffaf7`)** xuyên suốt dự án; áp dụng bố cục & chất liệu kính mờ **Glassy Dashboard V24** cho toàn bộ khu vực học tập.

### 3.2. Đặc thù riêng của dự án (Project-Specific Quirks)
* **Kiến trúc mô-đun:** Giao diện được tách sạch thành `src/components/*`, `src/views/*`, `src/data/*`, và `src/lib/*`. Hỗ trợ tham số `?view=dashboard` (hoặc `?view=lessons`, `?view=vocabulary`, `?view=flashcards`, `?view=pronunciation`, `?view=settings`) trên URL.
* **Typography tiếng Việt:** Sử dụng `Noto Serif` cho các chữ serif nhấn giọng in nghiêng (`<em>`) để không bị lỗi dấu tiếng Việt ở cỡ chữ lớn, kết hợp `Manrope` (`tabular-nums`) cho số liệu và `DM Sans` cho nội dung.
* **Backend & Database:** File `supabase/schema.sql` hoàn toàn idempotent (`create table if not exists`, `drop policy if exists`, trigger `on_auth_user_created`), chạy lại nhiều lần không báo lỗi.

---

## 4. NHẬT KÝ QUYẾT ĐỊNH KIẾN TRÚC (ARCHITECTURE DECISION RECORDS - ADR)

| Ngày | Quyết định | Lý do chọn (Context & Reason) | Hệ quả / Lưu ý |
| :--- | :--- | :--- | :--- |
| `08/11/2026` | Áp dụng kiến trúc **Glassy Dashboard V24** kết hợp bảng màu **Đỏ rượu + Xanh + Be** cho khu vực học tập | Người dùng muốn giao diện trang bài học hiện đại, trong trẻo theo mẫu Glassy Dashboard V24 nhưng vẫn đồng nhất với bản sắc màu Đỏ rượu + Xanh + Be của trang Landing Page | Giữ nguyên `LandingPage`; cập nhật `.v24-workspace`, `DESIGN.md` và `.impeccable/design.json` |
| `09/11/2026` | Cô lập tiến độ theo từng `userId` (`lingoly:progress:v2:user:<id>`) kết hợp đồng bộ bảng `public.user_state` và chuẩn hóa `supabase/schema.sql` idempotent | Đảm bảo nhiều tài khoản đăng nhập trên cùng trình duyệt hoặc nhiều thiết bị luôn có tiến trình độc lập, và người dùng clone từ GitHub có thể chạy `schema.sql` một lần duy nhất | Cập nhật `src/lib/progress.js`, `supabase/schema.sql`, `supabase/seed.sql` và `README.md` |
