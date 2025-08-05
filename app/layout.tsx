import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import Navbar from '../components/Navbar';
import SupabaseProvider from '../components/SupabaseProvider';

export const metadata = {
  title: 'LFGI - Leading Forward Growth Initiatives',
  description: 'Veteran-founded AI strategy platform focused on ethical innovation.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <SupabaseProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navbar />
            <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
