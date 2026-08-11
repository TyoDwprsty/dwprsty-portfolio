<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Architecture

- **Framework**: Next.js 15 (App Router)
- **Database ORM**: Prisma
- **Database Provider**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS, shadcn/ui
- **Admin Protection**: Next.js Middleware checks Supabase Session and verifies email.

**Key Conventions**:
- Supabase is used strictly for authentication and session management.
- Prisma is used strictly for database querying and mutations.
- **Code Quality**: All code must follow ESLint guidelines and pass `npm run lint`.
- **Deployment Readiness**: Code must successfully pass `npm run build` before considering work finished.
