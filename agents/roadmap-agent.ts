// Roadmap agent: generate and audit roadmap tasks
import { promises as fs } from 'fs';
import path from 'path';
import { log } from '../lib/agent-utils';
import { parseCheckboxes } from '../lib/md';

interface Roadmap {
  [category: string]: {
    '30': string[];
    '60': string[];
    '90': string[];
  };
}

function parseRoadmap(content: string): Roadmap {
  const lines = content.split('\n');
  let currentCategory = '';
  let currentPhase: '30' | '60' | '90' | '' = '';
  const roadmap: Roadmap = {};
  for (const line of lines) {
    const categoryMatch = line.match(/^##\s+(.*)/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1].trim();
      roadmap[currentCategory] = { '30': [], '60': [], '90': [] };
      currentPhase = '';
      continue;
    }
    const phaseMatch = line.match(/^###\s+(30|60|90)\s+Day/);
    if (phaseMatch) {
      currentPhase = phaseMatch[1] as '30' | '60' | '90';
      continue;
    }
    const taskMatch = line.match(/^-\s+(.*)/);
    if (taskMatch && currentCategory && currentPhase) {
      roadmap[currentCategory][currentPhase].push(taskMatch[1].trim());
    }
  }
  return roadmap;
}

async function main() {
  const items: any[] = [];
  // Read LLMs.md
  const llmsPath = path.join(process.cwd(), 'LLMs.md');
  const llmsContent = await fs.readFile(llmsPath, 'utf-8');
  const llmsItems = parseCheckboxes(llmsContent).map(i => ({ ...i, source: 'LLMs.md' }));
  items.push(...llmsItems);

  // Read README.md
  const readmePath = path.join(process.cwd(), 'README.md');
  const readmeContent = await fs.readFile(readmePath, 'utf-8');
  const readmeItems = parseCheckboxes(readmeContent).map(i => ({ ...i, source: 'README.md' }));
  items.push(...readmeItems);

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

  // Parse roadmap phases
  let roadmap: Roadmap | null = null;
  try {
    const roadmapPath = path.join(process.cwd(), 'analysis', 'roadmap.md');
    const roadmapContent = await fs.readFile(roadmapPath, 'utf-8');
    roadmap = parseRoadmap(roadmapContent);
  } catch (err) {
    // file might not exist
  }

  const incomplete = items.filter(i => !i.checked);
  await log('roadmap-agent', { action: 'scan', total: items.length, incomplete, roadmap });
  console.log(JSON.stringify({ total: items.length, incomplete, roadmap }, null, 2));
}

main();
