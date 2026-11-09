# TIÊU CHUẨN CÔNG NGHỆ & QUY ƯỚC VIẾT CODE (TECH STACK & CONVENTIONS)

> **Áp dụng cho:** Mọi AI Coding Agent (Cursor, Windsurf, Copilot, Cline, Roo Code, Claude Code...)
> **Vị trí đề xuất:** `.ai/rules/tech-stack-conventions.md`
> **Mục tiêu:** Đảm bảo mọi dòng code do AI sinh ra đều đồng nhất 100% với kiến trúc, phiên bản thư viện và phong cách lập trình của dự án.

---

## 1. HỆ SINH THÁI CÔNG NGHỆ (PROJECT TECH STACK)
*(Lưu ý cho Developer: Hãy chỉnh sửa các thông số trong ngoặc vuông `[...]` cho khớp với dự án thực tế của bạn)*

* **Ngôn ngữ chính:** TypeScript (Strict mode) / `[JavaScript / Python / C# / PHP...]`
* **Frontend:** `[React 19 / Next.js (App Router) / Vue 3 / Angular]` + `[Tailwind CSS / SCSS]`
* **Quản lý State & Data Fetching:** `[Zustand / Redux Toolkit]` + `[TanStack Query / SWR / Axios]`
* **Backend & API:** `[Node.js (Express / NestJS) / .NET Core / FastAPI / Laravel]` — Chuẩn `[RESTful API / GraphQL]`
* **Database & ORM:** `[PostgreSQL / MySQL / MongoDB]` kết hợp `[Prisma / Drizzle / TypeORM / Mongoose]`
* **Xác thực & Bảo mật:** `[JWT / NextAuth (Auth.js) / Clerk / OAuth2]`
* **Quản lý gói (Package Manager):** `[pnpm / npm / yarn / bun]` *(TUYỆT ĐỐI không dùng lẫn lộn các trình quản lý gói)*

---

## 2. QUY ƯỚC ĐẶT TÊN (NAMING CONVENTIONS)

| Đối tượng | Quy chuẩn | Ví dụ đúng | Ví dụ sai |
| :--- | :--- | :--- | :--- |
| **Biến & Hàm (Variables/Functions)** | `camelCase` (mang tính mô tả rõ nghĩa) | `userProfile`, `fetchOrderList()` | `data`, `get()`, `user_profile` |
| **Biến Boolean** | Tiền tố `is`, `has`, `should`, `can` | `isLoading`, `hasPermission` | `loading`, `permission` |
| **Hằng số (Constants)** | `UPPER_SNAKE_CASE` | `MAX_UPLOAD_SIZE`, `API_TIMEOUT_MS` | `maxUploadSize`, `api_timeout` |
| **Component (Frontend) & Class** | `PascalCase` | `ProductCard.tsx`, `AuthService` | `productCard.tsx`, `auth_service` |
| **File tiện ích / Hooks** | `camelCase` hoặc `kebab-case` | `useAuth.ts`, `format-currency.ts` | `UseAuth.ts`, `FormatCurrency.ts` |
| **API Endpoints (URL)** | `kebab-case` (danh từ số nhiều) | `/api/v1/user-orders` | `/api/v1/getUserOrders` |
| **Bảng & Cột Database** | `snake_case` | `order_items`, `created_at` | `OrderItems`, `createdAt` |

---

## 3. QUY TẮC VIẾT CODE CỐT LÕI (CODING STANDARDS)

### 3.1. Nguyên tắc chung (Clean Code & Modularity)
1. **Nguyên tắc Đơn nhiệm (Single Responsibility):** Mỗi hàm chỉ làm tốt 1 việc duy nhất (độ dài lý tưởng < 50 dòng). Mỗi file không nên vượt quá 300 dòng code.
2. **Return sớm (Early Return / Guard Clauses):** Xử lý các điều kiện lỗi hoặc ngoại lệ ở ngay đầu hàm để giảm việc lồng ghép `if/else` quá sâu (tối đa 2-3 cấp).
3. **Không dùng `any` (TypeScript):** Bắt buộc khai báo `interface` hoặc `type` rõ ràng. Nếu chưa biết trước kiểu dữ liệu, sử dụng `unknown` kèm theo kiểm tra kiểu (type narrowing).
4. **Không Hardcode (No Magic Numbers/Strings):** Mọi chuỗi cố định, mã trạng thái, URL, cấu hình đều phải tách ra file `constants` hoặc đọc từ biến môi trường (`.env`).

### 3.2. Quy tắc cho tầng Frontend
* **Tách biệt UI và Logic:** Không viết các hàm gọi API phức tạp hoặc xử lý dữ liệu nặng trực tiếp trong phần render của Component. Hãy tách ra các Custom Hooks (`use...`) hoặc `services/`.
* **Đầy đủ 4 trạng thái hiển thị:** Mọi Component có gọi dữ liệu từ Server đều **bắt buộc** phải xử lý đủ:
  1. `Loading State` (Skeleton / Spinner)
  2. `Error State` (Thông báo lỗi thân thiện + Nút thử lại)
  3. `Empty State` (Khi danh sách rỗng không có dữ liệu)
  4. `Success State` (Hiển thị dữ liệu chuẩn)
* **Responsive & Accessibility:** Luôn đảm bảo giao diện hiển thị tốt trên cả Mobile và Desktop. Các thẻ tương tác (`button`, `input`, `img`) phải có `aria-label` hoặc `alt` đầy đủ.

### 3.3. Quy tắc cho tầng Backend & Database
* **Validate đầu vào (Input Validation):** Không bao giờ tin tưởng dữ liệu từ Client gửi lên. Bắt buộc validate toàn bộ `body`, `query`, `params` bằng thư viện chuyên dụng (như `Zod`, `Joi`, `class-validator`) trước khi đưa vào tầng xử lý logic.
* **Cấu trúc phản hồi API đồng nhất (Standard API Response):**
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Thao tác thành công",
    "error": null,
    "meta": { "page": 1, "limit": 20, "total": 100 }
  }
  ```
* **Xử lý lỗi tập trung (Centralized Error Handling):** Sử dụng khối `try/catch` hoặc Middleware bắt lỗi toàn cục. Không bao giờ trả nguyên văn `stack trace` hoặc lỗi thô của Database ra ngoài Frontend trên môi trường Production.
* **Tối ưu truy vấn Database:**
  * Tránh tuyệt đối lỗi truy vấn $N+1$ (không gọi câu lệnh query bên trong vòng lặp `for/map`).
  * Chỉ `SELECT` các trường thực sự cần thiết (không lấy cột `password_hash` khi trả về thông tin User).
  * Sử dụng `Transaction` cho các thao tác làm thay đổi dữ liệu ở nhiều bảng cùng lúc (VD: Tạo đơn hàng + Trừ tồn kho + Ghi lịch sử thanh toán).

---

## 4. NHỮNG ĐIỀU TUYỆT ĐỐI CẤM (ANTI-PATTERNS)

1. **CẤM** tự ý cài đặt thư viện mới khi dự án đã có sẵn thư viện tương đương hoặc có thể viết bằng hàm thuần đơn giản.
2. **CẤM** để lại các đoạn `console.log()` chứa thông tin nhạy cảm (token, mật khẩu) hoặc các đoạn code bị comment nháp dài dòng sau khi hoàn thành task.
3. **CẤM** sửa đổi trực tiếp các file đã được sinh tự động (auto-generated files) như file build hoặc migration cũ đã chạy trên Production.