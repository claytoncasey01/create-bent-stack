# create-bent-stack

Scaffold a production-ready full-stack TypeScript monorepo with the **BENT Stack**.

## Quick Start

```bash
# npx
npx create-bent-stack my-app

# bun
bunx create-bent-stack my-app
```

Follow the prompts to configure your project, then:

```bash
cd my-app
bun install
# Copy .env.example to .env in apps/api and packages/database
# Update DATABASE_URL and BETTER_AUTH_SECRET
bun run db:generate
bun run db:push
bun run dev
```

## What's Included

### Core Stack (BENT)

| Letter | Technology | Role |
|--------|-----------|------|
| **B** | [Bun](https://bun.sh) | Runtime, bundler, and package manager |
| **E** | [Elysia](https://elysiajs.com) | Type-safe web framework for Bun |
| **N** | [Next.js](https://nextjs.org) | React framework for the frontend |
| **T** | [Turbo](https://turbo.build) | Monorepo build orchestration |

### Batteries Included

- **[Prisma](https://prisma.io)** — ORM with PostgreSQL
- **[Better Auth](https://better-auth.com)** — Authentication (email/password out of the box)
- **[Eden Treaty](https://elysiajs.com/eden/treaty/overview)** — End-to-end type-safe RPC between frontend and backend
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com)** — Component library built on Radix UI
- **[React Query](https://tanstack.com/query)** — Data fetching and caching
- **[Jotai](https://jotai.org)** — State management

## Generated Project Structure

```
my-app/
├── apps/
│   ├── api/               # Elysia API server
│   │   ├── src/
│   │   │   ├── handlers/  # Request handlers
│   │   │   ├── routes/    # Route definitions
│   │   │   ├── middleware/ # Error handling, logging, auth
│   │   │   └── lib/       # Auth config, logger, errors
│   │   └── .env.example
│   └── web/               # Next.js frontend
│       ├── app/
│       │   ├── (auth)/    # Sign in / sign up pages
│       │   └── (app)/     # Authenticated pages (dashboard)
│       ├── components/
│       │   ├── ui/        # shadcn/ui components
│       │   └── auth/      # Auth forms
│       └── lib/           # API client, auth, utilities
├── packages/
│   ├── database/          # Prisma schema + generated client
│   ├── shared/            # Shared types (API responses, Eden)
│   ├── eslint-config/     # Shared ESLint configs
│   └── typescript-config/ # Shared TypeScript configs
├── turbo.json
└── package.json
```

## CLI Options

```
Usage: create-bent-stack [project-name] [options]

Options:
  --examples    Include example code (Posts CRUD feature)
  --claude      Include Claude Code config (CLAUDE.md, AGENTS.md)
  -V, --version Show version number
  -h, --help    Show help
```

### `--examples`

Adds a complete Posts CRUD feature across the stack as a reference implementation — API routes, handlers, database model, React Query hooks, and UI components.

### `--claude`

Scaffolds `CLAUDE.md` and `AGENTS.md` files with full project context so [Claude Code](https://claude.ai/claude-code) understands your architecture out of the box.

## Requirements

- [Bun](https://bun.sh) >= 1.2
- [Node.js](https://nodejs.org) >= 18 (for Next.js)
- [PostgreSQL](https://postgresql.org) database

## License

MIT
