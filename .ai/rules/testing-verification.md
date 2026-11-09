# QUY CHUẨN KIỂM THỬ & TỰ XÁC MINH (TESTING & SELF-VERIFICATION)

> **Áp dụng cho:** Mọi AI Coding Agent (Cursor, Windsurf, Copilot, Cline, Roo Code, Claude Code...)
> **Vị trí đề xuất:** `.ai/rules/testing-verification.md`
> **Mục tiêu:** Bắt buộc AI phải tự kiểm tra, chạy thử và xác minh code không có lỗi cú pháp hoặc lỗi logic trước khi báo cáo "Hoàn thành" cho người dùng.

---

## 1. NGUYÊN TẮC "KHÔNG XÁC MINH = CHƯA HOÀN THÀNH"

AI Agent **TUYỆT ĐỐI KHÔNG** được tuyên bố đã hoàn thành nhiệm vụ chỉ ngay sau khi viết xong code. Mọi thay đổi mã nguồn đều phải trải qua **Vòng lặp Tự xác minh (Self-Verification Loop)** dưới đây:

```text
[Viết / Sửa Code] 
       │
       ▼
[Bước 1: Kiểm tra tĩnh (Type-check & Lint)] ──(Có lỗi)──► [Tự phân tích & Sửa lỗi]
       │ (Pass)                                                   │
       ▼                                                          │
[Bước 2: Chạy Kiểm thử (Unit / Integration Test)] ─(Fail)─────────┤
       │ (Pass)                                                   │
       ▼                                                          │
[Bước 3: Kiểm tra Build thử nghiệm] ───────────────(Fail)─────────┘
       │ (Pass)
       ▼
[Báo cáo hoàn thành cho Developer]
```

---

## 2. CÁC CÂU LỆNH XÁC MINH BẮT BUỘC (VERIFICATION COMMANDS)
*(Lưu ý: AI Agent cần kiểm tra file `package.json` hoặc cấu hình dự án để gọi đúng lệnh tương ứng)*

Sau khi chỉnh sửa code, hãy chủ động sử dụng công cụ Terminal để chạy các lệnh sau (nếu dự án có thiết lập):

1. **Kiểm tra kiểu dữ liệu (Type Check):**
   * Lệnh thường dùng: `npm run type-check` hoặc `npx tsc --noEmit`
   * *Yêu cầu:* Phải đạt `0 errors`.
2. **Kiểm tra quy chuẩn code (Linter):**
   * Lệnh thường dùng: `npm run lint`
   * *Yêu cầu:* Không có lỗi cảnh báo nghiêm trọng (warning/error) ở các file vừa sửa.
3. **Chạy bộ kiểm thử liên quan (Run Tests):**
   * Lệnh thường dùng: `npm test -- <đường-dẫn-file-test>` (Chỉ chạy file test liên quan để tiết kiệm thời gian, không cần chạy toàn bộ test của cả hệ thống lớn trừ khi được yêu cầu).

---

## 3. TIÊU CHUẨN VIẾT BÀI KIỂM THỬ (TESTING STANDARDS)

Khi tạo tính năng mới hoặc sửa lỗi (bug), AI cần chủ động viết hoặc cập nhật bài test theo nguyên tắc sau:

### 3.1. Cấu trúc bài Test theo mô hình AAA (Arrange - Act - Assert)
Mỗi test case phải được trình bày rõ ràng theo 3 phần:
* **Arrange (Chuẩn bị):** Khởi tạo dữ liệu đầu vào, thiết lập Mock cho các dịch vụ bên ngoài (Database, API bên thứ 3).
* **Act (Hành động):** Gọi hàm, Component hoặc API endpoint cần kiểm thử.
* **Assert (Khẳng định):** Kiểm tra kết quả đầu ra có khớp chính xác với kỳ vọng hay không.

### 3.2. Ma trận kịch bản bắt buộc phải kiểm thử (Test Coverage Matrix)
Không chỉ viết test cho trường hợp chạy đúng, mỗi chức năng cần bao phủ tối소 3 nhóm kịch bản:
1. **Happy Path (Luồng thành công chuẩn):** Dữ liệu đầu vào hợp lệ $\rightarrow$ Trả về kết quả đúng như mong đợi.
2. **Edge Cases (Trường hợp biên):** Chuỗi rỗng `""`, mảng rỗng `[]`, giá trị `0`, số âm, dữ liệu cực lớn, ký tự đặc biệt hoặc tiếng Việt có dấu.
3. **Error / Failure Path (Luồng lỗi & Bảo mật):**
   * Thiếu trường bắt buộc hoặc sai định dạng (VD: email không hợp lệ).
   * Truy cập trái phép (Chưa đăng nhập $\rightarrow$ trả về `401`, không đủ quyền $\rightarrow$ trả về `403`).
   * Dịch vụ bên ngoài hoặc Database bị ngắt kết nối $\rightarrow$ Hệ thống xử lý lỗi êm ái, không bị crash.

---

## 4. CHECKLIST RÀ SOÁT THỦ CÔNG TRƯỚC KHI BÀN GIAO

Nếu tác vụ chỉ liên quan đến giao diện (UI) hoặc dự án chưa cài đặt bộ công cụ Test tự động, AI phải tự rà soát qua danh sách kiểm tra sau:

- [ ] **Imports & Exports:** Có file nào được import nhưng không dùng (unused imports) hoặc đường dẫn import bị sai sau khi đổi tên/di chuyển file không?
- [ ] **Biến môi trường:** Nếu có dùng biến `process.env.X` mới, đã cập nhật tên biến đó vào file `.env.example` chưa?
- [ ] **Tương thích ngược (Backward Compatibility):** Việc sửa hàm/component này có làm hỏng các trang khác đang gọi nó không? (Hãy dùng công cụ tìm kiếm `grep` / `find references` để kiểm tra tất cả những nơi đang sử dụng hàm vừa sửa).
- [ ] **Dọn dẹp rác (Clean up):** Đã xóa hết các đoạn dữ liệu giả (hardcoded mock data) dùng lúc thử nghiệm và các câu lệnh `console.log` gỡ lỗi chưa?