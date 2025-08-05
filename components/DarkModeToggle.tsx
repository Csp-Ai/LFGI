'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'light' ? '🌞' : '🌚'}
    </button>
  );
}
