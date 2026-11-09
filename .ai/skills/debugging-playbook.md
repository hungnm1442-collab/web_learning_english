# KỊCH BẢN XỬ LÝ LỖI HỆ THỐNG (SYSTEMATIC DEBUGGING PLAYBOOK)

> **Áp dụng cho:** Mọi AI Coding Agent (Cursor, Windsurf, Copilot, Cline, Roo Code, Claude Code...)
> **Vị trí đề xuất:** `.ai/skills/debugging-playbook.md` hoặc `.ai/rules/debugging-playbook.md`
> **Mục tiêu:** Ngăn chặn tình trạng AI "đoán mò và sửa bừa" (trial-and-error) làm phát sinh thêm lỗi mới. Bắt buộc AI phải chẩn đoán nguyên nhân gốc rễ theo phương pháp khoa học trước khi can thiệp vào code.

---

## NGUYÊN TẮC VÀNG KHI GỠ LỖI (THE GOLDEN RULES OF DEBUGGING)

1. **Không sửa code khi chưa hiểu nguyên nhân:** Tuyệt đối không thay đổi code chỉ để "thử xem có hết lỗi không".
2. **Mỗi lần chỉ thay đổi 1 biến số:** Không sửa cùng lúc cả Frontend, Backend và cấu hình khi đang tìm lỗi, vì sẽ không biết thay đổi nào thực sự giải quyết được vấn đề.
3. **Quy tắc "Quá tam ba bận" (2-Strike Limit):** Nếu đã thử sửa 2 lần cho cùng một lỗi mà vẫn thất bại $\rightarrow$ **BẮT BUỘC DỪNG LẠI**, khôi phục (revert) lại code vừa sửa sai, phân tích lại từ đầu và hỏi ý kiến Developer.

---

## QUY TRÌNH GỠ LỖI 4 BƯỚC CHUẨN HÓA

Khi người dùng báo lỗi hoặc gửi một đoạn Log lỗi, AI phải tuần tự thực hiện 4 bước sau:

### BƯỚC 1: KHOANH VÙNG TẦNG PHÁT SINH LỖI (ISOLATE THE LAYER)
Dựa vào kiến trúc Website hoàn chỉnh, hãy xác định lỗi đang nằm ở mắt xích nào trước tiên:

| Triệu chứng / Dấu hiệu lỗi | Tầng nghi ngờ chính | Hành động kiểm tra đầu tiên của AI |
| :--- | :--- | :--- |
| Giao diện trắng trang, lệch bố cục, bấm nút không phản hồi | **Frontend (UI / State)** | Kiểm tra Console lỗi JS, kiểm tra nhánh điều kiện render (`undefined.map`), kiểm tra sự kiện `onClick`/`onSubmit`. |
| Lỗi `CORS`, `404 Not Found`, `400 Bad Request`, dữ liệu gửi đi bị `undefined` | **Cầu nối API (Network)** | Đối chiếu URL, HTTP Method (`GET`/`POST`), `Headers` (`Content-Type`, `Authorization`) và cấu trúc JSON giữa Frontend và Backend. |
| Lỗi `401 Unauthorized`, `403 Forbidden`, biến môi trường không nhận | **Auth & Config** | Kiểm tra luồng đọc/giải mã Token (JWT/Session), Middleware phân quyền và file `.env`. |
| Lỗi `500 Internal Server Error`, tính toán sai kết quả nghiệp vụ | **Backend Logic** | Đọc kỹ dòng báo lỗi trong Stack Trace để tìm đúng tên file và số thứ tự dòng code bị văng ngoại lệ. |
| Lỗi `Unique constraint`, `Foreign key`, `Connection timeout`, dữ liệu không lưu | **Database & ORM** | Kiểm tra Schema, kiểu dữ liệu các cột, trạng thái chạy Migration và câu lệnh Query thực tế. |

### BƯỚC 2: ĐƯA RA GIẢ THUYẾT NGUYÊN NHÂN GỐC RỄ (ROOT CAUSE HYPOTHESIS)
* Đọc các file liên quan trực tiếp đến dòng báo lỗi.
* Đặt câu hỏi truy ngược luồng dữ liệu (Data Flow Tracing): *"Biến `X` bị `null` ở dòng 45, vậy `X` được truyền từ đâu vào? Hàm gọi nó ở tầng trên đã truyền đúng chưa?"*
* Đưa ra **1 - 2 giả thuyết có khả năng cao nhất** giải thích tại sao lỗi lại xảy ra.

### BƯỚC 3: KIỂM CHỨNG & PHẪU THUẬT TỐI THIỂU (MINIMAL FIX)
* Chỉ sửa đúng vùng code gây ra nguyên nhân gốc rễ (Minimal, Surgical Change).
* **Không tiện tay refactor (tái cấu trúc)** các đoạn code khác không liên quan trong lúc đang sửa bug.
* Bổ sung các biện pháp phòng vệ (Defensive Programming) như toán tử Optional Chaining (`?.`), giá trị mặc định (`??`), hoặc khối `try/catch` hợp lý.

### BƯỚC 4: KIỂM TRA HỒI QUY (REGRESSION CHECK)
* Chạy lại kịch bản gây lỗi ban đầu để chắc chắn lỗi đã biến mất hoàn toàn.
* Kiểm tra xem bản vá này có vô tình làm hỏng các tính năng lân cận đang dùng chung hàm đó hay không.

---

## MẪU BÁO CÁO KẾT QUẢ GỠ LỖI CHO DEVELOPER

Khi trình bày giải pháp sửa lỗi cho người dùng, hãy trả lời ngắn gọn theo cấu trúc sau:

> ### 🔍 Chẩn đoán lỗi:
> * **Tầng phát sinh:** `[Frontend / API / Backend / Database]` — tại file `đường/dẫn/file.ts` (dòng `XX`).
> * **Nguyên nhân gốc rễ (Root Cause):** `[Giải thích ngắn gọn 1-2 câu tại sao lỗi xảy ra]`.
>
> ### 🛠️ Giải pháp khắc phục:
> * `[Mô tả thay đổi vừa thực hiện hoặc đề xuất thực hiện]`.
> * **Cách phòng ngừa tương lai:** `[VD: Đã thêm kiểm tra null / Đã bổ sung kịch bản Unit Test cho trường hợp này]`.