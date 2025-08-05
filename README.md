# LFGI

Leading Forward Growth Initiatives – a veteran-founded AI strategy platform.

## Getting Started

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and supply your Supabase project keys.
3. Run the development server: `npm run dev`

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com/).
Connect the GitHub repository and set the `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables in your Vercel project
settings.

## Features

- Next.js App Router with TypeScript
- Tailwind CSS with dark/light theme toggle
- Supabase client and auth-enabled dashboard
- Blog system with WYSIWYG editor
