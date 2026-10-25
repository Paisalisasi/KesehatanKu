'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Lock, HeartPulse } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/auth?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-3" />
        <p className="text-sm font-medium text-slate-600">Menghubungkan ke sesi aman...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto my-16 max-w-md rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
          <Lock className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Login Diperlukan</h2>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          Untuk menjaga privasi dan menyimpan riwayat triase serta catatan diary kesehatan Anda, silakan masuk ke akun terlebih dahulu.
        </p>
        <div className="mt-6">
          <Link
            href={`/auth?redirect=${encodeURIComponent(pathname)}`}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition"
          >
            <HeartPulse className="h-4 w-4" />
            <span>Masuk / Daftar Akun</span>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
