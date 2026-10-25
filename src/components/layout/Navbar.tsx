'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { 
  HeartPulse, 
  BookHeart, 
  LayoutDashboard, 
  LogIn, 
  LogOut, 
  User as UserIcon 
} from 'lucide-react';

export default function Navbar() {
  const { user, signOut, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-800">
              Tenang<span className="text-emerald-600">Cek</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400">AI Health Triage Companion</span>
          </div>
        </Link>

        {/* Dynamic Navigation */}
        <nav className="flex items-center gap-2 sm:gap-4">
          {isLoading ? (
            <div className="h-8 w-24 animate-pulse rounded-lg bg-slate-100" />
          ) : user ? (
            /* Navigasi saat SUDAH LOGIN */
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-slate-50 transition"
              >
                <LayoutDashboard className="h-4 w-4 text-emerald-600" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/checkin"
                className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-emerald-800 hover:bg-emerald-100 transition"
              >
                <HeartPulse className="h-4 w-4 text-emerald-600" />
                <span>Cek Gejala</span>
              </Link>

              <Link
                href="/diary"
                className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
              >
                <BookHeart className="h-4 w-4" />
                <span>Diary</span>
              </Link>

              <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <span className="hidden md:inline-block max-w-[120px] truncate text-xs text-slate-500 font-medium">
                  {user.email?.split('@')[0]}
                </span>
                <button
                  type="button"
                  onClick={() => signOut()}
                  title="Keluar dari akun"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            /* Navigasi saat BELUM LOGIN (Landing Page) */
            <>
              <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-500">
                <a href="/#tentang" className="hover:text-emerald-700 transition">Tentang</a>
                <a href="/#alur" className="hover:text-emerald-700 transition">Alur 5 Pilar</a>
                <a href="/#urgensi" className="hover:text-emerald-700 transition">4 Level Urgensi</a>
                <a href="/#disclaimer" className="hover:text-emerald-700 transition">Disclaimer Medis</a>
              </div>

              <Link
                href="/auth"
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-emerald-700 transition"
              >
                <LogIn className="h-4 w-4" />
                <span>Masuk / Daftar</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
