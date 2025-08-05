import { promises as fs } from 'fs';
import path from 'path';

const LOG_PATH = path.join(process.cwd(), 'logs.json');

export interface LogEntry {
  timestamp: string;
  agent: string;
  [key: string]: any;
}

export async function log(agent: string, data: Record<string, any>) {
  const entry: LogEntry = { timestamp: new Date().toISOString(), agent, ...data };
  let existing: LogEntry[] = [];
  try {
    const txt = await fs.readFile(LOG_PATH, 'utf-8');
    existing = JSON.parse(txt);
  } catch (err) {
    // file may not exist
  }
  existing.push(entry);
  await fs.writeFile(LOG_PATH, JSON.stringify(existing, null, 2));
}

export async function getFiles(dir: string, filter: (file: string) => boolean): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'sop' || entry.name === 'tmp') continue;
      files.push(...await getFiles(res, filter));
    } else {
      if (filter(res)) files.push(res);
    }
  }
  return files;
}
