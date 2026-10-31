'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { BookHeart, HeartPulse, LayoutDashboard, LogIn, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, signOut, isLoading } = useAuth();
  const pathname = usePathname();
  const navClass = (href: string) => `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${pathname === href ? 'bg-emerald-50 text-emerald-900' : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-900'}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-950/10 bg-[#fbfcf8]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="TenangCek beranda">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-900 text-lime-200 transition group-hover:bg-emerald-800"><HeartPulse className="h-[1.1rem] w-[1.1rem]" /></span>
          <span><span className="block text-[15px] font-bold tracking-tight text-emerald-950">TenangCek</span><span className="hidden text-[10px] font-medium text-slate-500 sm:block">Pahami keluhan. Tentukan langkah.</span></span>
        </Link>

        <nav aria-label="Navigasi utama" className="flex items-center gap-1 sm:gap-2">
          <Link href="/dashboard" className={navClass('/dashboard')} aria-label="Dashboard"><LayoutDashboard className="h-4 w-4" /><span className="hidden sm:inline">Dashboard</span></Link>
          <Link href="/diary" className={`${navClass('/diary')} hidden sm:inline-flex`}><BookHeart className="h-4 w-4" />Diary</Link>
          <Link href="/checkin" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-emerald-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:px-4"><HeartPulse className="h-4 w-4 text-lime-200" /><span>Cek gejala</span></Link>
          {!isLoading && (user ? (
            <button type="button" onClick={() => signOut()} aria-label="Keluar dari akun" title="Keluar" className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"><LogOut className="h-4 w-4" /></button>
          ) : (
            <Link href="/auth" aria-label="Masuk" className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-emerald-900 sm:w-auto sm:gap-2 sm:px-3"><LogIn className="h-4 w-4" /><span className="hidden text-sm font-medium sm:inline">Masuk</span></Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
