import fs from 'fs';
import path from 'path';

const statusPath = path.join(__dirname, '..', 'analysis', 'import-status.json');
const reportPath = path.join(__dirname, '..', 'codex-prompts', 'merge-logic-report.md');

function generateReport() {
  if (!fs.existsSync(statusPath)) {
    throw new Error('import-status.json not found');
  }
  const data = JSON.parse(fs.readFileSync(statusPath, 'utf8')) as Record<string, Record<string, string>>;
  const lines: string[] = ['# Merge Logic Report', ''];
  for (const [repo, files] of Object.entries(data)) {
    lines.push(`## ${repo}`);
    for (const [file, status] of Object.entries(files)) {
      lines.push(`- ${file}: ${status}`);
    }
    lines.push('');
  }
  fs.writeFileSync(reportPath, lines.join('\n'));
  console.log(`Report written to ${reportPath}`);
}

generateReport();
