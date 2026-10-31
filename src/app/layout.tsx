import type { Metadata } from 'next';
import './globals.css';
import ShellLayout from '@/components/layout/ShellLayout';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'TenangCek — Pahami keluhan, tentukan langkah',
  description: 'Panduan awal untuk memahami urgensi keluhan kesehatan dan langkah berikutnya. Bukan pengganti diagnosis tenaga medis.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col bg-[#f7f8f3] antialiased selection:bg-lime-200 selection:text-emerald-950">
        <AuthProvider>
          <ShellLayout>
            {children}
          </ShellLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
