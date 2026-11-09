# TÀI LIỆU KIẾN TRÚC WEB & CẤU HÌNH AI AGENT HARNESS (ĐA NỀN TẢNG)

Tài liệu này đóng vai trò là **bộ khung định hướng (Universal AI Agent Harness)** cho mọi AI Coding Agent (như Cursor, Windsurf, GitHub Copilot, Cline, Roo Code, Claude Code...) khi tham gia phát triển dự án Web. Nội dung kết hợp giữa **Kiến trúc tổng thể của một Website hoàn chỉnh** và **Cấu trúc tổ chức thư mục điều phối Agent chuẩn hóa**.

---

## PHẦN 1: KIẾN TRÚC HOÀN CHỈNH CỦA MỘT WEBSITE (CONTEXT CHO AGENT)

Một dự án Web hoàn chỉnh không chỉ có giao diện. Khi viết code, thiết kế hệ thống hoặc debug, AI Agent cần nắm rõ sự tương tác giữa các tầng dưới đây:

### 1. Sơ đồ luồng hoạt động tổng quan

```text
[Người dùng] 
    │ (Truy cập qua trình duyệt với bảo mật SSL/HTTPS)
    ▼
[TÊN MIỀN / DOMAIN] (VD: www.example.com - Địa chỉ ngôi nhà)
    │
    ▼
[DNS] (Phân giải tên miền thành địa chỉ IP của Server: example.com -> 123.45.67.89)
    │
    ▼
[HOSTING / SERVER] (Nơi lưu trữ và chạy website: VPS, Cloud, Web Hosting)
    ├──► [FRONTEND] (Giao diện người dùng nhìn thấy & tương tác)
    │        │
    │        ▼ (Giao tiếp qua)
    │      [API] (Cầu nối trung gian: REST, GraphQL, gRPC...)
    │        │
    │        ▼
    └──► [BACKEND] (Xử lý logic nghiệp vụ phía Server)
             │
             ▼
         [DATABASE] (Nơi lưu trữ dữ liệu lâu dài của website)
```

### 2. Chi tiết các thành phần cốt lõi

| Thành phần | Vai trò chính | Công nghệ / Ví dụ phổ biến | Lưu ý cho AI Agent khi lập trình |
| :--- | :--- | :--- | :--- |
| **Domain & DNS** | Định danh và điều hướng tên miền về đúng IP máy chủ. | Cloudflare, Route53, Namecheap | Cấu hình đúng biến môi trường domain, xử lý CORS và Subdomain. |
| **SSL / HTTPS** | Mã hóa kết nối giữa trình duyệt và website. | Let's Encrypt, Cloudflare SSL | Không hardcode `http://`, đảm bảo Cookie có cờ `Secure` trên Production. |
| **Hosting / Server** | Nơi lưu trữ và vận hành mã nguồn trên Internet. | VPS, AWS/GCP/Azure, Vercel, Docker | Đảm bảo code tương thích môi trường build, tối ưu tài nguyên RAM/CPU. |
| **Frontend** | Phần giao diện hiển thị và tương tác trực tiếp với người dùng. | HTML/CSS/JS, React, Vue, Angular, Next.js | Chú trọng UX/UI, Responsive, quản lý State, tối ưu tốc độ tải trang. |
| **Backend** | Xử lý logic nghiệp vụ, đăng nhập, phân quyền, kiểm tra dữ liệu, kết nối DB. | Node.js, .NET, Java, Python, PHP, Go | Validate dữ liệu đầu vào nghiêm ngặt, xử lý lỗi tập trung, kiến trúc sạch. |
| **API** | Cầu nối giúp Frontend giao tiếp với Backend hoặc dịch vụ bên thứ 3. | RESTful API, GraphQL, WebSocket | Thiết kế chuẩn xác HTTP Status Code, tài liệu hóa (Swagger/OpenAPI). |
| **Database** | Lưu trữ dữ liệu lâu dài (Users, Products, Orders, Posts...). | **SQL:** MySQL, PostgreSQL<br>**NoSQL:** MongoDB | Tối ưu câu truy vấn (tránh lỗi N+1), đánh Index, dùng Migration an toàn. |

### 3. Các thành phần hỗ trợ (Supporting Services)
* **CDN (Content Delivery Network):** Tăng tốc độ tải nội dung tĩnh (ảnh, CSS, JS) trên toàn cầu.
* **Cache:** Lưu dữ liệu tạm thời (Redis, Memcached) để tăng tốc độ phản hồi và giảm tải cho Database.
* **File Storage:** Lưu trữ ảnh, video, tài liệu dung lượng lớn (AWS S3, Cloudinary, MinIO) thay vì lưu trực tiếp trên ổ cứng Server.
* **Authentication:** Hệ thống đăng nhập và xác thực người dùng (JWT, OAuth2, Session, Clerk/Auth0).

---

## PHẦN 2: CẤU TRÚC DỰ ÁN AI AGENT HARNESS (CHUẨN ĐA NỀN TẢNG)

Để AI Agent hiểu sâu dự án Web và làm việc tự chủ mà không phụ thuộc vào một hãng duy nhất, dự án sử dụng cấu trúc trung lập (gợi ý dùng thư mục `.ai/` hoặc `.agent/` và file gốc `AGENTS.md`).

### 1. Bảng quy đổi tên file giữa các công cụ AI phổ biến

| Thành phần Harness | Chuẩn chung (Đề xuất) | Cursor | Windsurf | GitHub Copilot | Claude Code |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hướng dẫn gốc** | `AGENTS.md` | `.cursorrules` | `.windsurfrules` | `.github/copilot-instructions.md` | `CLAUDE.md` |
| **Quy tắc (Rules)** | `.ai/rules/*.md` | `.cursor/rules/*.mdc` | `.windsurf/rules/*.md` | `.github/instructions/*.md` | `.claude/rules/*.md` |
| **Kỹ năng (Skills)** | `.ai/skills/` | `.cursor/skills/` | `.windsurf/workflows/` | *(Tích hợp qua Extensions)* | `.claude/skills/` |
| **Công cụ ngoài (MCP)**| `.ai/mcp.json` | `.cursor/mcp.json` | `mcp_config.json` | `.vscode/mcp.json` | `.mcp.json` |

### 2. Sơ đồ cây thư mục dự án đề xuất

```text
my-web-project/
├── AGENTS.md                        # [1] Hướng dẫn gốc của dự án cho mọi AI Agent
├── .ai/                             # Thư mục trung tâm chứa toàn bộ cấu hình Harness
│   ├── settings.json                # [4] Cấu hình chung & Vòng đời tự động hóa (Hooks)
│   ├── settings.local.json          # Cấu hình cá nhân (được đưa vào .gitignore)
│   ├── rules/                       # [2] Các quy tắc dạng module
│   │   ├── architecture.md          # Quy tắc kiến trúc Frontend / Backend / API
│   │   ├── testing.md               # Quy tắc viết Unit Test / E2E Test
│   │   ├── security.md              # Quy tắc bảo mật (Auth, SQL Injection, XSS...)
│   │   └── interactive-workflow.md  # Quy tắc hỏi đáp chủ động với Developer
│   ├── skills/                      # [3] Các quy trình (Workflow) tái sử dụng
│   │   ├── code-review/
│   │   │   ├── SKILL.md
│   │   │   ├── scripts/
│   │   │   ├── references/
│   │   │   └── assets/
│   │   ├── test-writer/
│   │   │   └── SKILL.md
│   │   └── security-audit/
│   │       └── SKILL.md
│   └── agents/                      # [5] Các Subagents (Trợ lý chuyên biệt từng mảng)
│       ├── code-reviewer.md
│       ├── test-writer.md
│       └── security-reviewer.md
├── .mcp.json                        # [6] Cấu hình kết nối công cụ bên ngoài (MCP)
├── src/                             # Mã nguồn chính (Frontend / Backend)
├── tests/                           # Thư mục chứa kịch bản kiểm thử
├── docs/                            # Tài liệu kỹ thuật của dự án
├── scripts/                         # Các script tự động hóa (build, deploy, seed DB)
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

### 3. Giải thích chi tiết 7 thành phần của AI Harness

1. **File Hướng dẫn gốc (`AGENTS.md`):**
   * Lưu trữ hướng dẫn xuyên suốt dự án: kiến trúc tổng thể, tiêu chuẩn viết code, các câu lệnh thường dùng (build, test, lint), quy trình làm việc và bước xác minh. Cần giữ ngắn gọn, rõ ràng. *(Mẹo: Có thể tạo symlink từ `CLAUDE.md` hoặc `.cursorrules` trỏ về file này).*
2. **Thư mục Rules (`.ai/rules/`):**
   * Chứa các hướng dẫn dạng module. Có thể áp dụng toàn cục hoặc chỉ kích hoạt khi AI làm việc với những đường dẫn (path) nhất định (ví dụ: chỉ đọc `security.md` khi sửa code trong `src/api/auth/`).
3. **Thư mục Skills (`.ai/skills/`):**
   * Các workflow có thể tái sử dụng và gọi theo yêu cầu. Mỗi kỹ năng dùng một file `SKILL.md` định nghĩa quy trình, đi kèm các script thực thi, tài liệu tham khảo (`references/`) và tài sản mẫu (`assets/`).
4. **Cấu hình Hooks (`settings.json`):**
   * Thiết lập vòng đời tự động hóa (automation) cho các sự kiện phổ biến khi AI hoạt động:
     * `PreToolUse` / `PostToolUse`: Chạy trước/sau khi AI dùng công cụ (VD: tự động chạy Prettier/ESLint sau khi AI sửa file).
     * `SessionStart` / `SessionEnd`: Khởi tạo ngữ cảnh hoặc dọn dẹp khi bắt đầu/kết thúc phiên.
     * `Stop` / `Notification`: Cảnh báo khi AI hoàn tất tác vụ.
5. **Thư mục Subagents (`.ai/agents/`):**
   * Chứa các trợ lý AI chuyên biệt được viết bằng Markdown (có phần khai báo YAML frontmatter). Mỗi Subagent được tách biệt bối cảnh (context) và giới hạn quyền truy cập công cụ riêng để tránh làm nhiễu luồng làm việc chính.
6. **Cấu hình MCP (`.mcp.json`):**
   * Thiết lập kết nối đến các công cụ bên ngoài, dịch vụ đám mây và dữ liệu từ xa (như kết nối trực tiếp vào PostgreSQL, GitHub, Figma, Sentry...). Khi được hỗ trợ, ưu tiên dùng giao thức HTTP thay vì cài đặt cục bộ nặng nề.
7. **Cấu trúc Plugin tách rời (`my-plugin/`):**
   * Khi muốn đóng gói bộ Harness này để dùng chung cho nhiều dự án Web khác nhau, có thể tách thành cấu trúc Plugin riêng (bao gồm `plugin.json`, `skills/`, `agents/`, `hooks/`, `.mcp.json`, `.lsp.json` và `monitors/`).

---

## PHẦN 3: BẢNG ÁNH XẠ (MAPPING) KIẾN TRÚC WEB VÀO BỘ HARNESS

Khi xây dựng các file trong thư mục `.ai/`, hãy phân bổ kiến thức từ **Phần 1 (Kiến trúc Web)** vào đúng vị trí của **Phần 2 (Harness)** theo bảng sau:

| Thành phần Web (Hình 1) | Nơi khai báo trong AI Harness (Hình 2) | Mục đích điều phối AI Agent |
| :--- | :--- | :--- |
| **Frontend, Backend, API** | `AGENTS.md` & `.ai/rules/architecture.md` | Giúp AI hiểu rõ Tech Stack đang dùng (VD: React + Node.js) và quy chuẩn giao tiếp API. |
| **Database & Cache** | `.mcp.json` & `.ai/rules/architecture.md` | Cấp quyền cho AI đọc cấu trúc bảng (Schema) qua MCP để viết câu lệnh SQL/ORM chính xác. |
| **Authentication & SSL/HTTPS** | `.ai/rules/security.md` & `.ai/skills/security-audit/` | Ngăn chặn AI viết code lộ thông tin nhạy cảm, đảm bảo luôn có bước xác thực và phân quyền. |
| **Hosting, Domain, CDN, Storage** | `.env.example` & `scripts/` | Giúp AI nhận diện các biến môi trường cần thiết mà không làm lộ Secret Key thật. |
| **Kiểm thử chất lượng Web** | `.ai/rules/testing.md` & `.ai/agents/test-writer.md` | Tự động hóa việc kiểm tra giao diện (Frontend) và logic nghiệp vụ (Backend) sau khi code xong. |