import React from 'react';
import StepChat from '@/components/triage/StepChat';
import { HeartPulse } from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';

export const metadata = {
  title: 'Check-in Gejala • TenangCek',
  description: 'Ceritakan keluhan Anda secara bertahap dan dapatkan panduan langkah yang tenang.',
};

export default function CheckinPage() {
  return (
    <AuthGuard>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 mb-2">
            <HeartPulse className="h-3.5 w-3.5 text-emerald-600" />
            <span>Symptom Check-in Terproteksi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Cek Keluhan Kesehatan Anda
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Jawab pertanyaan sederhana satu per satu. Sistem akan menilai tingkat urgensi dan menyarankan tindakan yang tepat.
          </p>
        </div>

        <StepChat />
      </div>
    </AuthGuard>
  );
}
