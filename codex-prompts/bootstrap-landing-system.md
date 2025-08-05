# bootstrap-landing-system

Bootstraps the LFGI AI Agent Ecosystem landing page and deploys it via Vercel with Supabase integration, modular UI components, and Codex prompt automation.

---

## 🔥 Description

This prompt creates a production-grade landing page for LFGI using **Next.js + TailwindCSS**, with components wired to Supabase, a Codex workflow panel, a roadmap UI, dynamic agent visualizations, and basic environment hygiene checks. It includes all necessary files, Vercel deployment instructions, and Codex agent stubs to self-extend the system.

---

## 🛠️ Inputs

- `repo`: GitHub repo name (e.g. `lfgi-landing`)
- `supabase`: `{ url: string, anon_key: string }`
- `vercel`: `{ env: .env.local or key:value object }`
- `components`: optional subset override (`['AgentGraph', 'MetricsPanel']`)
- `codex_prompts`: if true, generates supporting prompt files for maintenance

---

## 📦 Output Files

Creates the following files and folders:

- `pages/index.tsx` — master landing layout with 8 visual sections
- `components/AgentGraph.tsx` — renders Supabase agents table
- `components/MetricsPanel.tsx` — visualizes Codex workflow
- `components/RoadmapPanel.tsx` — loads local roadmap-agent tasks
- `components/EnvironmentStatus.tsx` — flags synced/missing/leaked vars
- `components/KnowledgeSystem.tsx` — tables parsed prompts by tags
- `components/Founders.tsx` — renders founder bios & ethos
- `components/Contact.tsx` — CTA for partners, funders, and waitlist
- `.env.local` — populated with Supabase keys
- `codex-prompts/render-landing-page.md` — reusable render logic
- `codex-prompts/write-roadmap-from-agent.md` — logs 30/60/90 items
- `codex-prompts/scan-env-status.md` — reports secret status
- `logs/flows/YYYY-MM-DD-landing-build.log` — build audit

---

## 🔁 Steps

1. **Initialize Project**:  
   Scaffold `npx create-next-app@latest --ts` with Tailwind CSS pre-config.
   
2. **Insert Core Components**:  
   Write `pages/index.tsx` and all components under `components/`.

3. **Inject Supabase Bindings**:  
   Populate `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=<supabase.url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase.anon_key>
   ```

4. **Enable Vercel CI/CD**:  
   - Auto-deploy on push to `main`
   - Import `.env.local` into Vercel
   - Connect GitHub > Vercel (if not already linked)

5. **Parse Roadmap Agent**:  
   - Read `agents/roadmap-agent.ts`
   - Extract tasks grouped by `30/60/90` horizon and status

6. **Render Agent Graph**:  
   - Pull `agents` from Supabase and list in `AgentGraph.tsx`

7. **Codex Knowledge System**:  
   - Read prompt metadata from `codex-prompts/`
   - Display in table view with tags & agent links

8. **Scan Environment Variables**:  
   - Check `.env.local` vs expected: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `VITE_SECRET`
   - Mark each as `synced`, `missing`, or `leaked`

9. **Log Results**:  
   Save system build outputs to `logs/flows/YYYY-MM-DD-landing-build.log`

---

## ✅ Sample Success Log

```
[2025-08-04T18:02:00Z] Bootstrapping LFGI Landing Page…
[2025-08-04T18:02:05Z] Injected index.tsx and 7 modular components
[2025-08-04T18:02:08Z] Parsed 8 agents from Supabase
[2025-08-04T18:02:11Z] Read 11 Codex prompts from codex-prompts/
[2025-08-04T18:02:13Z] Roadmap agent tasks extracted: 30D (3), 60D (2), 90D (4)
[2025-08-04T18:02:15Z] Environment audit: 2 synced, 1 leaked
[2025-08-04T18:02:16Z] Vercel deployment triggered (Preview)
[2025-08-04T18:02:19Z] All artifacts rendered & logged successfully
```

---

## 🤖 Future Extensions

- Add agent-authenticated dashboards
- SSR support with Supabase Auth
- Codex agent to auto-deploy on roadmap/task updates
- Inter-agent graph w/ canvas rendering or d3.js

---

## 🧠 Codex Tags

`#landing-page`, `#agent-dashboard`, `#supabase`, `#codex-bootstrap`, `#infra`, `#nextjs`, `#vercel`, `#ethics`, `#roadmap`, `#AI-agent-systems`

