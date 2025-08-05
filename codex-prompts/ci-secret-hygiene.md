# CI Secret Hygiene

- Inspect `.github/workflows/` and `lib/env.ts`.
- Add dotenv schema validation using a library like `zod` or `envalid`.
- Implement a secret validation agent that runs in CI.
- Ensure `lib/env.ts` throws on missing or malformed variables.
- Propose PR comments when `NEXT_PUBLIC_*` or hardcoded secrets are detected.
- Add error-catching logic in workflows to abort on secret leaks.
