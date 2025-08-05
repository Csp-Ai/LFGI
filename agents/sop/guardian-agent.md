# guardian-agent

## Purpose
Monitor repository for secrets, ethical risk, and policy violations.

## Expected Inputs
- Run via `pnpm tsx agents/guardian-agent.ts`
- Receives a diff or file paths to scan.

## Expected Outputs
- Logs detected issues to `logs.json`.
- Returns non-zero exit code on critical findings.

## Guidelines
- Scan for `NEXT_PUBLIC_` variables and hardcoded API keys.
- Flag files with TODOs in security-sensitive areas.
- Respect `.gitignore` and skip `node_modules`.

## Example Log Output
```json
{
  "agent": "guardian-agent",
  "action": "scan",
  "issues": []
}
```

## Escalation
- Post a PR comment when secrets are detected.
- Notify maintainers via issue if ethical guidelines are breached.
