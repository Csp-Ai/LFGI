// Codex planner: propose next prompt from roadmap
import { promises as fs } from 'fs';
import path from 'path';
import { log } from '../lib/agent-utils';
import { parseCheckboxes } from '../lib/md';

async function main() {
  const llmsPath = path.join(process.cwd(), 'LLMs.md');
  const content = await fs.readFile(llmsPath, 'utf-8');
  const tasks = parseCheckboxes(content).filter(i => !i.checked);
  const suggestion = tasks.length ? tasks[0].text : 'All tasks complete';
  const output = `# Codex Planner Output\n\n## Open Tasks\n${tasks.map(t => `- [ ] ${t.text}`).join('\n')}\n\n## Suggested Next Prompt\n${suggestion}\n`;
  await fs.writeFile('codex-planner-output.md', output);
  await log('codex-planner', { action: 'suggest', suggestion });
  console.log(output);
}

main();
