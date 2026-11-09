# BẢN BÀN GIAO NGỮ CẢNH CHO PHIÊN CHAT MỚI (SESSION HANDOFF)
*Cập nhật lần cuối: 2026-11-09 12:10 (GMT+7)*

## 1. Lưu ý & Sở thích đặc biệt của Chủ dự án (User Preferences & Rules)
- **Phong cách làm việc:** Tự động quét và kích hoạt các bộ kỹ năng trong `.ai/skills/` (`impeccable`, `debugging-playbook.md`) và tuân thủ `.ai/rules/` (`interactive-workflow.md`, `tech-stack-conventions.md`, `testing-verification.md`). Giao tiếp 100% bằng Tiếng Việt.
- **Những điều người dùng ĐẶC BIỆT CẤM / KHÔNG THÍCH:** Không tự ý làm mất hoặc thay đổi trang `LandingPage` và bảng màu gốc khi nâng cấp các trang con.
- **Yêu cầu riêng về UI/UX:** Khu vực học tập sử dụng kiến trúc **Glassy Dashboard V24** kết hợp bảng màu **Đỏ rượu (`#8d1e32`) + Xanh trầm (`#46658b`) + Be/Kem (`#ede0d7` / `#fffaf7`)**.

## 2. Những điểm đặc thù / "Bẫy" của dự án này (Project Quirks & Gotchas)
- **Kiến trúc mô-đun:** Các màn hình nằm trong `src/views/` (`Dashboard.jsx`, `Lessons.jsx`, `Vocabulary.jsx`, `Flashcards.jsx`, `Pronunciation.jsx`, `Settings.jsx`), thành phần dùng chung trong `src/components/`, dữ liệu trong `src/data/` và logic trong `src/lib/`.
- **Cô lập dữ liệu đa tài khoản:** `src/lib/progress.js` lưu tách biệt theo `lingoly:progress:v2:user:<userId>` (hoặc `lingoly:progress:v2:guest`) và đồng bộ lên bảng `public.user_state` trên Supabase.
- **Supabase SQL Idempotent:** `supabase/schema.sql` đã có đầy đủ `drop policy if exists`, trigger `handle_new_user()` và dữ liệu khởi tạo cho 10 bài học + từ vựng mẫu.

## 3. Trạng thái tiến độ ngay lúc dừng (Current Snapshot)
- **Vừa làm xong:**
  - Hoàn thiện toàn bộ các tính năng học tập (10 bài ngữ pháp + quiz, 100 từ vựng, Flashcard SRS 6 hộp, luyện phát âm Web Speech API, theo dõi chuỗi ngày học).
  - Sửa lỗi cô lập tiến độ giữa các tài khoản trong `src/lib/progress.js`.
  - Chuẩn hóa `supabase/schema.sql`, `supabase/seed.sql`, `.env.example`, `.gitignore` và `README.md` để sẵn sàng push lên GitHub.
  - Kiểm tra `npx oxlint src` (`0 warnings, 0 errors`) và `npm run build` thành công.
- **Đang làm dở (In-Progress):** Không có — mã nguồn đã hoàn chỉnh để đẩy lên GitHub.
- **Lỗi (Bug) còn tồn đọng:** Không có.

## 4. Nhiệm vụ đầu tiên cho phiên chat tiếp theo (Immediate Next Step)
- Hỗ trợ triển khai (deploy) lên Vercel/Netlify hoặc mở rộng thêm cấp độ bài học B1 khi người dùng yêu cầu.
