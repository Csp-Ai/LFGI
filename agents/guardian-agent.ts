// Guardian agent: detect secrets or risky code
import { promises as fs } from 'fs';
import path from 'path';
import { log, getFiles } from '../lib/agent-utils';

async function main() {
  const projectRoot = process.cwd();
  const envPath = path.join(projectRoot, '.env.example');
  const envContent = await fs.readFile(envPath, 'utf-8').catch(() => '');
  const envVars = envContent
    .split('\n')
    .map(line => line.split('=')[0]?.trim())
    .filter(Boolean);

  const files = await getFiles(projectRoot, f => /\.(ts|tsx|js|jsx)$/.test(f));
  const violations: any[] = [];
  for (const file of files) {
    const text = await fs.readFile(file, 'utf-8');
    const lines = text.split(/\r?\n/);
    lines.forEach((line, idx) => {
      if (/eval\s*\(/.test(line)) {
        violations.push({ file, line: idx + 1, issue: 'eval usage' });
      }
      for (const envVar of envVars) {
        if (line.includes(envVar) && !line.includes('process.env')) {
          violations.push({ file, line: idx + 1, issue: `Hardcoded value for ${envVar}` });
        }
      }
    });
  }
  await log('guardian-agent', { action: 'scan', violations });
  if (violations.length) {
    console.log('Violations found:', violations);
  } else {
    console.log('No violations found');
  }
}

main();
