# CHỈ THỊ TỔNG CHỈ HUY DÀNH CHO AI AGENT (MASTER HARNESS ENTRY POINT)

> **Vị trí file:** Đặt tại thư mục gốc của dự án (`AGENTS.md`).
> *(Lưu ý: Có thể đổi tên hoặc copy thành `.clinerules`, `.cursorrules`, `.windsurfrules`, hoặc `CLAUDE.md` tùy công cụ bạn dùng).*
> **Vai trò:** Đây là điểm khởi đầu (Entry Point) điều phối toàn bộ hành vi, quy tắc viết code, quản lý tiến độ và cách sử dụng các bộ kỹ năng (Skills) trong dự án Web này.

---

## 1. QUY TRÌNH KHỞI ĐỘNG PHIÊN LÀM VIỆC (SESSION BOOTSTRAP)

Ngay khi bắt đầu một cuộc trò chuyện mới hoặc nhận yêu cầu đầu tiên từ Developer, AI **BẮT BUỘC** thực hiện ngầm các bước sau trước khi phản hồi:

1. **Kiểm tra Bàn giao phiên trước:** Kiểm tra xem ở thư mục gốc (hoặc `.ai/`) có file **`SESSION_HANDOFF.md`** hay không. Nếu có, hãy đọc nó đầu tiên để nắm bắt ngay:
   * Sở thích và những điều cấm kỵ của chủ dự án.
   * Những điểm đặc thù / "bẫy" của dự án.
   * Công việc đang làm dở ở phiên trước.
2. **Đọc Trạng thái tổng thể:** Đọc file **`PROJECT_STATE.md`** để biết bức tranh toàn cảnh và tiến độ các tính năng.
3. **Nắm vững Kiến trúc Web:** Tham chiếu **`.ai/WEB_AGENT_HARNESS.md`** để hiểu rõ sự liên kết giữa Frontend $\leftrightarrow$ API $\leftrightarrow$ Backend $\leftrightarrow$ Database của hệ thống.

---

## 2. BỘ QUY TẮC BẮT BUỘC TUÂN THỦ (CORE RULES)

Trong suốt quá trình làm việc, AI phải luôn nạp và tuân thủ nghiêm ngặt 3 bộ quy tắc nằm trong thư mục `.ai/rules/`:

* **Tương tác & Làm rõ yêu cầu (`.ai/rules/interactive-workflow.md`):**
  * Tuyệt đối **không đoán mò** khi yêu cầu thiếu thông tin (Hỏi tối đa 2-4 câu ngắn gọn kèm phương án gợi ý A/B).
  * Trong lúc đang code, nếu phát hiện **ý tưởng tối ưu hơn**, **việc cần làm phát sinh**, hoặc **thao tác rủi ro cao** (xóa file, sửa cấu trúc DB, cài thư viện lạ) $\rightarrow$ **TẠM DỪNG VÀ HỎI** ý kiến người dùng.
* **Tiêu chuẩn Công nghệ & Code (`.ai/rules/tech-stack-conventions.md`):**
  * Tuân thủ 100% Tech Stack, quy ước đặt tên (`camelCase`, `PascalCase`, `snake_case`) và cấu trúc API Response đã định nghĩa.
  * Frontend phải đủ 4 trạng thái (`Loading`, `Error`, `Empty`, `Success`). Backend phải Validate dữ liệu đầu vào và xử lý lỗi tập trung.
* **Kiểm thử & Tự xác minh (`.ai/rules/testing-verification.md`):**
  * **Không xác minh = Chưa hoàn thành.** Tự động chạy `type-check`, `lint` và `test` qua Terminal sau khi sửa code.

---

## 3. CƠ CHẾ TỰ ĐỘNG QUÉT KỸ NĂNG MỞ RỘNG (AUTO-DISCOVERY SKILLS)

Dự án này sử dụng cơ chế nạp kỹ năng động. **Trước khi xử lý mọi yêu cầu**, AI phải tự động quét đệ quy toàn bộ thư mục và thư mục con bên trong:
* `.ai/skills/`
* `.agents/skills/` hoặc `.agent/skills/` (Các bộ skill được cài qua lệnh `npx skills add ...`)

Quy trình bắt buộc:
1. Duyệt tất cả file `SKILL.md` và các file mô tả skill tương đương trong mọi thư mục con.
2. Đọc `name` và `description`/phạm vi áp dụng để xác định skill phù hợp với yêu cầu hiện tại.
3. Nếu có một hoặc nhiều skill phù hợp, đọc và áp dụng skill đó trước khi lập kế hoạch hoặc sửa file.
4. Khi nhiều skill cùng phù hợp, áp dụng tất cả skill liên quan; ưu tiên skill chuyên biệt hơn skill tổng quát và tránh bỏ qua các skill có phạm vi giao nhau.
5. Nếu không tìm thấy skill phù hợp, tiếp tục theo các quy tắc chung của project và không tự tạo ra skill thay thế.

### Quy tắc kích hoạt tự động (Wildcard Routing):
* **Khi xử lý lỗi / Bug:** Tự động đọc và làm theo quy trình 4 bước tại **`.ai/skills/debugging-playbook.md`**. (Áp dụng quy tắc "Quá tam ba bận": thử sửa 2 lần không được phải dừng lại báo cáo).
* **Khi làm việc với Giao diện (Frontend / UI / UX / CSS):** Nếu thấy sự tồn tại của các bộ skill thiết kế (như `impeccable` hoặc tương đương trong thư mục skills), **BẮT BUỘC** đọc file `SKILL.md` của chúng để áp dụng từ vựng thiết kế, trau chuốt giao diện (polish) và chống giao diện rập khuôn (anti-slop).
* **Khi có bất kỳ thư mục Skill mới nào khác:** Tự động đọc phần mô tả (`description` trong YAML frontmatter của các file `SKILL.md`) để tự biết khi nào cần kích hoạt kỹ năng đó mà không cần người dùng phải khai báo thủ công vào file này.

---

## 4. TỰ ĐỘNG CÀI ĐẶT REPO SKILL BÊN NGOÀI (ZERO-FRICTION SKILL INSTALLER)

Khi người dùng đưa một đường link GitHub hoặc tên một repo (ví dụ: *"Cài thêm repo X vào project này"*) và yêu cầu tích hợp làm kỹ năng mới, AI sẽ tự động thực hiện quy trình sau mà không bắt người dùng làm thủ công:

1. **Cách 1 (Ưu tiên dùng CLI chuẩn):** Chạy lệnh trên Terminal tại thư mục gốc của dự án:
   ```bash
   npx -y skills add <tên-tác-giả/tên-repo>
   ```
2. **Cách 2 (Nếu repo không hỗ trợ CLI):**
   * Tải tạm repo đó về (hoặc đọc nội dung), **chỉ trích xuất đúng thư mục quy tắc/kỹ năng** (như `.agents/skills/`, `.ai/`, hoặc các file `.md` cốt lõi) đưa gọn vào `.ai/skills/<tên-repo>/`.
   * Xóa bỏ toàn bộ các thư mục thừa của các nền tảng khác để giữ dự án luôn sạch sẽ.

---

## 5. QUY TRÌNH ĐÓNG PHIÊN & BÀN GIAO (SESSION HANDOFF)

Khi hoàn thành một mốc công việc lớn, hoặc khi người dùng ra hiệu kết thúc phiên chat (VD: *"nghỉ thôi"*, *"tổng kết lại"*, *"xuất file bàn giao"*):

1. Cập nhật các đầu việc đã hoàn thành vào **`PROJECT_STATE.md`**.
2. **Tự động sinh ra (hoặc cập nhật) file `SESSION_HANDOFF.md`** theo đúng mẫu đã quy định trong `PROJECT_STATE.md` (bao gồm: Lưu ý riêng của chủ dự án, Đặc thù/Bẫy của dự án, Trạng thái dừng hiện tại và Bước tiếp theo) để sẵn sàng nạp vào phiên chat mới.