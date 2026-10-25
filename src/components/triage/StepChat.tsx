'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SymptomPayload, TriageResult } from '@/types/triage';
import { Send, ArrowRight, ArrowLeft, Loader2, Sparkles, AlertCircle, LayoutDashboard } from 'lucide-react';
import AnxietySlider from './AnxietySlider';
import RedFlagAlert from './RedFlagAlert';
import TriageResultCard from './TriageResultCard';
import BreathingExercise from '../calm/BreathingExercise';
import { useAuth } from '@/contexts/AuthContext';

interface StepQuestion {
  step: number;
  title: string;
  question: string;
  helper: string;
  type: 'text' | 'options' | 'anxiety';
  quickChips: string[];
}

const STEPS: StepQuestion[] = [
  {
    step: 1,
    title: 'Gejala Utama',
    question: 'Apa gejala atau keluhan utama yang paling Anda rasakan saat ini?',
    helper: 'Tuliskan secara bebas atau pilih salah satu gejala yang umum di bawah.',
    type: 'text',
    quickChips: ['Sakit Kepala', 'Demam', 'Batuk & Flu', 'Nyeri Perut', 'Pusing Kleyengan', 'Nyeri Dada Tertekan', 'Mual & Muntah'],
  },
  {
    step: 2,
    title: 'Durasi',
    question: 'Sudah berapa lama gejala tersebut Anda rasakan?',
    helper: 'Durasi waktu membantu sistem memahami seberapa mendesak kondisinya.',
    type: 'options',
    quickChips: ['Baru beberapa jam', '1 - 2 hari', '3 - 5 hari', 'Lebih dari 1 minggu'],
  },
  {
    step: 3,
    title: 'Tingkat Keparahan',
    question: 'Seberapa besar gejala ini mengganggu kegiatan harian Anda?',
    helper: 'Pilih tingkat yang paling menggambarkan kondisi fisik Anda saat ini.',
    type: 'options',
    quickChips: [
      'Ringan (Masih bisa beraktivitas seperti biasa)',
      'Sedang (Cukup mengganggu, butuh istirahat sesekali)',
      'Berat (Sangat mengganggu, sulit bangun atau beraktivitas)',
    ],
  },
  {
    step: 4,
    title: 'Gejala Penyerta',
    question: 'Apakah ada gejala lain yang muncul bersamaan?',
    helper: 'Misalnya demam, lemas, nafsu makan turun, atau tidak ada keluhan lain.',
    type: 'text',
    quickChips: ['Tidak ada keluhan lain', 'Badan lemas', 'Nafsu makan turun', 'Nyeri otot / pegal', 'Sulit tidur'],
  },
  {
    step: 5,
    title: 'Check-in Kecemasan',
    question: 'Sebelum melihat panduan langkah, seberapa cemas Anda mengenai gejala ini?',
    helper: 'Kami gunakan skala ini untuk menyesuaikan gaya bahasa dan saran ketenangan.',
    type: 'anxiety',
    quickChips: [],
  },
];

export default function StepChat() {
  const { user } = useAuth();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<SymptomPayload>({
    mainSymptom: '',
    duration: '',
    severity: 'sedang',
    accompanyingSymptoms: [],
    anxietyBefore: 3,
  });
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const step = STEPS[currentStepIndex];

  const handleNext = async (customValue?: string) => {
    setErrorMessage(null);
    const value = (customValue !== undefined ? customValue : textInput).trim();

    // Validasi input
    if (step.step === 1 && !value && !formData.mainSymptom) {
      setErrorMessage('Mohon isi atau pilih keluhan utama Anda terlebih dahulu.');
      return;
    }

    // Update state form data
    const updatedForm = { ...formData };
    if (step.step === 1) {
      updatedForm.mainSymptom = value || formData.mainSymptom;
    } else if (step.step === 2) {
      updatedForm.duration = value || formData.duration;
    } else if (step.step === 3) {
      if (value.toLowerCase().includes('ringan')) updatedForm.severity = 'ringan';
      else if (value.toLowerCase().includes('berat')) updatedForm.severity = 'berat';
      else updatedForm.severity = 'sedang';
    } else if (step.step === 4) {
      if (value && value !== 'Tidak ada keluhan lain') {
        updatedForm.accompanyingSymptoms = [value];
      }
    }

    setFormData(updatedForm);
    setTextInput('');

    // Jika belum di step terakhir, maju ke step berikutnya
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Step terakhir selesai -> Submit ke API Triage
      await submitTriage(updatedForm);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setErrorMessage(null);
    }
  };

  const submitTriage = async (payload: SymptomPayload) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Gagal memproses data gejala');
      }

      setResult(json.data);

      // Simpan ke riwayat sesi pengguna untuk ditampilkan di Dashboard
      if (user?.id) {
        try {
          const cacheKey = `tenangcek_sessions_${user.id}`;
          const existing = JSON.parse(localStorage.getItem(cacheKey) || '[]');
          const newHistoryItem = {
            id: `session-${Date.now()}`,
            symptomName: payload.mainSymptom,
            duration: payload.duration || 'Beberapa saat',
            urgencyLevel: json.data.urgencyLevel,
            reasoning: json.data.reasoning,
            createdAt: new Date().toISOString(),
            doctorSummary: json.data.doctorSummary,
          };
          localStorage.setItem(cacheKey, JSON.stringify([newHistoryItem, ...existing]));
        } catch (err) {
          console.warn('Gagal menyimpan sesi ke riwayat lokal:', err);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi gangguan jaringan';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentStepIndex(0);
    setFormData({
      mainSymptom: '',
      duration: '',
      severity: 'sedang',
      accompanyingSymptoms: [],
      anxietyBefore: 3,
    });
    setTextInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Tampilan Hasil Triage Bila Sudah Selesai */}
      {result ? (
        <div className="space-y-6">
          {result.isRedFlagTriggered ? (
            <RedFlagAlert
              reason={result.reasoning}
              actionText={result.nextSteps?.[0] || 'Segera ke IGD terdekat atau hubungi 119'}
            />
          ) : (
            <TriageResultCard result={result} />
          )}

          {/* Latihan Napas bila user cemas atau direkomendasikan */}
          {((formData.anxietyBefore && formData.anxietyBefore >= 3) || result.calmSupport?.suggestBreathingExercise) && (
            <BreathingExercise />
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Kembali ke Dashboard Saya</span>
            </Link>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              Cek Gejala Baru
            </button>
          </div>
        </div>
      ) : (
        /* Alur Pertanyaan Bertahap (Step by Step Chat) */
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span className="text-emerald-700 font-bold">Langkah {step.step} dari {STEPS.length}: {step.title}</span>
              <span>{Math.round(((step.step) / STEPS.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-emerald-600 transition-all duration-300 ease-out"
                style={{ width: `${(step.step / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Pertanyaan Chat */}
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>TenangCek Guide</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              {step.question}
            </h2>
            <p className="text-xs text-slate-500">{step.helper}</p>
          </div>

          {/* Opsi Cepat (Quick Chips) */}
          {step.quickChips.length > 0 && (
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Pilihan Cepat:
              </span>
              <div className="flex flex-wrap gap-2">
                {step.quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleNext(chip)}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-medium text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 transition shadow-2xs"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Anxiety Slider untuk Step 5 */}
          {step.type === 'anxiety' && (
            <div className="mb-6">
              <AnxietySlider
                value={formData.anxietyBefore ?? 3}
                onChange={(val) => setFormData({ ...formData, anxietyBefore: val })}
              />
            </div>
          )}

          {/* Input Teks Bebas jika tipe teks */}
          {step.type === 'text' && (
            <div className="relative mb-6">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNext();
                }}
                placeholder="Atau ketik keluhan Anda di sini..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition"
              />
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700 border border-rose-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Navigation Buttons */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStepIndex === 0 || isLoading}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium ${
                currentStepIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali
            </button>

            <button
              type="button"
              onClick={() => handleNext()}
              disabled={isLoading}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Menganalisis Triage...
                </>
              ) : currentStepIndex === STEPS.length - 1 ? (
                <>
                  <span>Lihat Panduan Triage</span>
                  <Sparkles className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  <span>Lanjut</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
