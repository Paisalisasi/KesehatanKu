import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import DisclaimerBanner from '@/components/layout/DisclaimerBanner';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'TenangCek - AI Health Triage Companion',
  description: 'Bantu putuskan langkah berikutnya dengan tenang, bukan menebak penyakit. AI Health Triage Companion untuk IMK.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col bg-slate-50 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <AuthProvider>
          <DisclaimerBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
