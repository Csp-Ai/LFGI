'use client';

import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <Link href="/" className="font-bold text-xl">LFGI</Link>
      <div className="flex items-center space-x-4">
        <Link href="/blog" className="hover:underline">Blog</Link>
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
