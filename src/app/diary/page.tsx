import React from 'react';
import DiaryList from '@/components/diary/DiaryList';
import { BookHeart, Info } from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';

export const metadata = {
  title: 'Symptom Diary • TenangCek',
  description: 'Pantau perkembangan dan perubahan gejala Anda dari hari ke hari.',
};

export default function DiaryPage() {
  return (
    <AuthGuard>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 mb-2">
            <BookHeart className="h-3.5 w-3.5 text-emerald-600" />
            <span>Pantau Perkembangan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Symptom Diary Pribadi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Catat sensasi tubuh harian Anda. Jika gejala tidak membaik lebih dari 3 hari, sistem akan merekomendasikan periksa ke dokter.
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-900 flex items-start gap-2.5">
          <Info className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
          <p>
            <strong>Tips Evaluasi:</strong> Jika Anda mencatat gejala berturut-turut dengan tingkat keparahan yang sama atau meningkat (skala 3 ke atas selama lebih dari 3 hari), segera jadwalkan konsultasi dokter umum di faskes primer terdekat.
          </p>
        </div>

        <DiaryList />
      </div>
    </AuthGuard>
  );
}
