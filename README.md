# LingoLy — Website Tự Học Tiếng Anh Cho Người Việt

**LingoLy** là nền tảng tự học tiếng Anh theo lộ trình rõ ràng, thân thiện với người Việt, kết hợp bài học ngữ pháp tương tác, từ điển 100 từ vựng A1–A2 có phát âm, hệ thống Flashcard ôn tập ngắt quãng 6 hộp (Spaced Repetition) và phòng luyện phát âm chấm điểm trực tiếp bằng giọng nói.

---

## ✨ Tính năng nổi bật

- **10 Bài học Ngữ pháp nền tảng (A1–A2):** Giải thích ngắn gọn kèm ví dụ song ngữ (có nút nghe phát âm từng câu) và bài kiểm tra trắc nghiệm 5 câu cuối mỗi bài (đạt từ `60%` để hoàn thành).
- **Kho 100 Từ vựng theo 10 chủ đề đời sống:** Tìm kiếm tức thì, lọc theo chủ đề hoặc trạng thái học (`Chưa học`, `Đang học`, `Cần ôn`, `Đã thuộc`), nghe phát âm chuẩn và xem câu ví dụ.
- **Flashcard Ôn tập ngắt quãng (6-Box Leitner SRS):** Tự động tính ngày ôn lại (`1, 2, 4, 7, 14, 30` ngày) dựa trên 3 mức đánh giá (`Chưa nhớ`, `Nhớ được`, `Quá dễ`).
- **Phòng Luyện phát âm (Web Speech API):**
  - Nghe giọng mẫu chuẩn (`speechSynthesis`) ở tốc độ thường hoặc chậm (`0.7x`).
  - Thu âm giọng đọc qua Micro (`SpeechRecognition`) và chấm điểm độ khớp từ vựng / câu.
  - Luyện phân biệt **5 cặp âm dễ nhầm (Minimal Pairs)** như `/ɪ/` vs `/iː/` (`ship` / `sheep`), `/e/` vs `/æ/` (`bed` / `bad`).
- **Theo dõi Chuỗi ngày học (Streak) & Mục tiêu mỗi ngày:** Biểu đồ hoạt động 7 ngày gần nhất, tùy chỉnh mục tiêu số thẻ ôn và số từ mới mỗi ngày.
- **Cô lập & Đồng bộ tiến độ theo từng tài khoản:**
  - Chế độ khách (`Guest`) hoạt động ngay không cần đăng nhập.
  - Khi đăng nhập bằng Supabase Auth, mỗi tài khoản có ngăn lưu trữ độc lập và tự động đồng bộ đám mây qua bảng `public.user_state`.

---

## 🛠️ Công nghệ sử dụng

- **Frontend:** React 19, Vite 8, CSS Custom Properties (Phong cách **Glassy Dashboard V24** kết hợp bảng màu **Wine Red & Quiet Blue**)
- **Backend & Auth:** Supabase (`@supabase/supabase-js`, PostgreSQL Row Level Security)
- **Âm thanh & Giọng nói:** Trình duyệt Web Speech API (`speechSynthesis` & `SpeechRecognition`)
- **Kiểm tra chất lượng mã nguồn:** Oxlint (`npx oxlint src`)

---

## 📂 Cấu trúc thư mục

```text
web_learn_english/
├── public/                  # Tài nguyên tĩnh & favicon
├── src/
│   ├── components/          # Thành phần dùng chung (LandingPage, AuthModal, icons)
│   ├── data/                # Dữ liệu 10 bài học (lessons.js) & 100 từ vựng (vocabulary.js)
│   ├── lib/                 # Kết nối Supabase (supabase.js), tiến độ SRS (progress.js), âm thanh (speech.js)
│   ├── views/               # 6 màn hình học tập (Dashboard, Lessons, Vocabulary, Flashcards, Pronunciation, Settings)
│   ├── App.jsx              # Khung điều hướng Glassy Dashboard V24 & tìm kiếm nhanh
│   ├── App.css              # Hệ thống giao diện & responsive
│   └── index.css            # Design tokens & cấu hình gốc
├── supabase/
│   ├── schema.sql           # Toàn bộ bảng, RLS policies, Trigger & dữ liệu khởi tạo (Idempotent)
│   └── seed.sql             # Dữ liệu mẫu bài học & từ vựng
├── .env.example             # Mẫu biến môi trường kết nối Supabase
└── package.json
```

---

## 🚀 Hướng dẫn cài đặt & chạy dự án (Local)

### Bước 1: Clone dự án và cài đặt thư viện

```bash
git clone <url-repo-cua-ban>
cd web_learn_english
npm install
```

### Bước 2: Cấu hình biến môi trường (Tùy chọn nếu muốn bật Đăng nhập & Đồng bộ đám mây)

1. Sao chép file `.env.example` thành `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Điền thông tin project Supabase của bạn vào `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```
   *(Lưu ý: Chỉ sử dụng `anon` / `publishable` key ở phía Frontend, tuyệt đối không dùng `service_role` key).*

> **Mẹo:** Ngay cả khi chưa tạo file `.env.local`, bạn vẫn có thể chạy và học toàn bộ tính năng ở chế độ Khách (lưu trên `localStorage`).

### Bước 3: Khởi tạo Database trên Supabase

1. Mở **SQL Editor** trên bảng điều khiển Supabase của bạn.
2. Copy toàn bộ nội dung file [`supabase/schema.sql`](./supabase/schema.sql) dán vào SQL Editor và bấm **Run**.
   - File `schema.sql` đã được thiết kế **Idempotent** (tự động tạo bảng, bật RLS, tạo Policy an toàn, gắn Trigger tự khởi tạo hồ sơ khi có người đăng ký mới và nạp sẵn dữ liệu mẫu). Bạn có thể bấm Run lại bất kỳ lúc nào mà không lo lỗi trùng lặp.
3. Trong mục **Authentication > Providers > Email**, bật **Enable Email provider** (có thể tắt *Confirm email* nếu muốn đăng ký xong vào học ngay khi thử nghiệm).

### Bước 4: Khởi chạy ứng dụng

```bash
npm run dev
```

Mở trình duyệt tại địa chỉ hiển thị trên terminal (thường là `http://localhost:5173`).

---

## 🧪 Kiểm tra mã nguồn & Build Production

```bash
# Kiểm tra lỗi cú pháp & quy chuẩn React bằng Oxlint
npx oxlint src

# Đóng gói bản Production
npm run build
```
