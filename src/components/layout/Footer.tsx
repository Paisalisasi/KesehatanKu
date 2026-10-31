import React from 'react';
import { HeartPulse, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-emerald-950/10 bg-[#fbfcf8] py-7 text-xs text-slate-500">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-4 w-4 shrink-0 text-emerald-800" />
            <span className="font-semibold text-emerald-950">TenangCek</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">Pahami keluhan, tentukan langkah.</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
            <span>Riwayat cek tersimpan di browser perangkat ini.</span>
          </div>
        </div>

        <div className="mt-5 border-t border-emerald-950/10 pt-4 text-slate-400">
          © {new Date().getFullYear()} TenangCek · Informasi awal, bukan pengganti diagnosis atau konsultasi tenaga medis.
        </div>
      </div>
    </footer>
  );
}
