// Roadmap agent: generate and audit roadmap tasks
import { promises as fs } from 'fs';
import path from 'path';
import { log } from '../lib/agent-utils';
import { parseCheckboxes } from '../lib/md';

async function main() {
  const items: any[] = [];
  // Read LLMs.md
  const llmsPath = path.join(process.cwd(), 'LLMs.md');
  const llmsContent = await fs.readFile(llmsPath, 'utf-8');
  const llmsItems = parseCheckboxes(llmsContent).map(i => ({ ...i, source: 'LLMs.md' }));
  items.push(...llmsItems);

  // Read markdown files in codex-prompts
  const promptsDir = path.join(process.cwd(), 'codex-prompts');
  try {
    const files = await fs.readdir(promptsDir);
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const content = await fs.readFile(path.join(promptsDir, file), 'utf-8');
      const promptItems = parseCheckboxes(content).map(i => ({ ...i, source: path.join('codex-prompts', file) }));
      items.push(...promptItems);
    }
  } catch (err) {
    // directory might not exist
  }

  const incomplete = items.filter(i => !i.checked);
  await log('roadmap-agent', { action: 'scan', total: items.length, incomplete });
  console.log(JSON.stringify({ total: items.length, incomplete }, null, 2));
}

main();
