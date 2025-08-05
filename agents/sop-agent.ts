// SOP agent: generate basic SOP files for agents
import { promises as fs } from 'fs';
import path from 'path';
import { log } from '../lib/agent-utils';

async function main() {
  const agentsDir = path.join(process.cwd(), 'agents');
  const sopDir = path.join(agentsDir, 'sop');
  await fs.mkdir(sopDir, { recursive: true });
  const files = await fs.readdir(agentsDir);
  const tsFiles = files.filter(f => f.endsWith('.ts'));
  for (const file of tsFiles) {
    const filePath = path.join(agentsDir, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const name = path.basename(file, '.ts');
    const commentMatch = content.match(/\/\/\s*(.*)/);
    const purpose = commentMatch ? commentMatch[1].trim() : 'No description provided.';
    const sop = `# ${name}\n\n## Purpose\n${purpose}\n\n## Expected Inputs\n- Run via \`pnpm tsx agents/${file}\`\n\n## Expected Outputs\n- Logs actions to logs.json\n\n## Example Log Output\n\`\`\`json\n${JSON.stringify({ agent: name, action: 'example' }, null, 2)}\n\`\`\`\n`;
    await fs.writeFile(path.join(sopDir, `${name}.md`), sop);
  }
  await log('sop-agent', { action: 'generate-sop', count: tsFiles.length });
  console.log(`Generated ${tsFiles.length} SOP files.`);
}

main();

