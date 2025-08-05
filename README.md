# LFGI

Leading Forward Growth Initiatives – a veteran-founded AI strategy platform.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS
- Supabase (Postgres, Auth, Storage)
- Vercel for deployment
- OpenAI integrations
- GitHub Actions CI/CD

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and provide:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Run the development server: `npm run dev`

## Testing

Run snapshot tests with:

```bash
npm test
```

## Deployment

This project is configured for [Vercel](https://vercel.com/). Environment
variables are mapped in `vercel.json`. Set secrets in your Vercel project
settings or via the CLI:

```bash
vercel secrets add next_public_supabase_url <value>
vercel secrets add next_public_supabase_anon_key <value>
```

Pushes and pull requests trigger the GitHub Actions workflow, which runs lint,
tests, and build checks before Vercel deploys.

## Features

- Supabase client and auth-enabled dashboard
- Blog system with WYSIWYG editor
- Dark/light theme with Tailwind CSS
- Agent-ready architecture (see `agents/`)

## Codex System Overview
- Agents live under `agents/` and log actions to `logs.json`.
- Reusable prompts are stored in `codex-prompts/` for Codex workflows.
- `pnpm tsx agents/roadmap-agent.ts` audits roadmap items and phases.
