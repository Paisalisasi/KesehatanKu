import React from 'react';
import { PhoneCall, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <h4 className="font-semibold text-slate-800 flex items-center gap-1.5 mb-2">
              <HeartHandshake className="h-4 w-4 text-emerald-600" />
              TenangCek IMK Project
            </h4>
            <p className="text-slate-500 leading-relaxed">
              AI Health Triage Companion dirancang untuk meredakan kecemasan akibat self-diagnosis berlebih, membantu menentukan langkah selanjutnya secara tenang dan terarah.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 flex items-center gap-1.5 mb-2">
              <PhoneCall className="h-4 w-4 text-rose-500" />
              Kontak Darurat Medis
            </h4>
            <p className="text-slate-500 mb-1">Ambulans & Kedaruratan Nasional: <strong>119</strong></p>
            <p className="text-slate-500">Panggilan Darurat Umum: <strong>112</strong></p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 flex items-center gap-1.5 mb-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Privasi & Keamanan Data
            </h4>
            <p className="text-slate-500 leading-relaxed">
              Mode tamu didukung penuh. Data pribadi diminimalkan dan dilindungi dengan enkripsi Row Level Security (RLS).
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-4 text-center text-slate-400">
          © {new Date().getFullYear()} TenangCek • Dirancang untuk Interaksi Manusia dan Komputer (IMK)
        </div>
      </div>
    </footer>
  );
}
