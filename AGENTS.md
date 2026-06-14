<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Architecture

- **Framework**: Next.js 15 (App Router)
- **Database ORM**: Prisma
- **Database Provider**: Supabase PostgreSQL
- **Authentication**: Supabase Auth (Google OAuth)
- **Styling**: Tailwind CSS, shadcn/ui
- **Admin Protection**: Next.js Middleware checks Supabase Session and verifies email.

**Key Conventions**:
- Supabase Auth is used strictly for authentication and session management.
- Prisma is used strictly for database querying and mutations.
- Do not use Supabase JS Client for database queries (e.g., `supabase.from()`), use `prisma` instead.
