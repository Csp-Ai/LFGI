export interface CheckboxItem {
  text: string;
  checked: boolean;
}

export function parseCheckboxes(md: string): CheckboxItem[] {
  const regex = /^- \[([ xX])\] (.+)$/gm;
  const items: CheckboxItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(md))) {
    items.push({
      checked: match[1].toLowerCase() === 'x',
      text: match[2].trim(),
    });
  }
  return items;
}
