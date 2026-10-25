'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from '@/contexts/AuthContext';
import { 
  HeartPulse, 
  BookHeart, 
  Wind, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  FileText,
  Calendar,
  AlertTriangle,
  LogOut
} from 'lucide-react';
import BreathingExercise from '@/components/calm/BreathingExercise';
import DoctorSummaryModal from '@/components/triage/DoctorSummaryModal';
import { UrgencyLevel } from '@/types/triage';

interface SessionHistoryItem {
  id: string;
  symptomName: string;
  duration?: string;
  urgencyLevel: UrgencyLevel;
  reasoning: string;
  createdAt: string;
  doctorSummary?: {
    summary: string;
    threeQuestionsForDoctor: string[];
  };
}

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [showBreathing, setShowBreathing] = useState(false);
  const [sessions, setSessions] = useState<SessionHistoryItem[]>([]);
  const [selectedDoctorSummary, setSelectedDoctorSummary] = useState<{
    summary: { summary: string; threeQuestionsForDoctor: string[] };
    urgencyLabel: string;
  } | null>(null);

  useEffect(() => {
    // Load saved sessions from localStorage as reliable local cache
    try {
      const saved = localStorage.getItem(`tenangcek_sessions_${user?.id}`);
      if (saved) {
        setSessions(JSON.parse(saved));
      } else {
        // Mock sample initial session if empty
        const initialMock: SessionHistoryItem[] = [
          {
            id: 'sample-1',
            symptomName: 'Sakit Kepala Tegang',
            duration: '2 hari',
            urgencyLevel: 'pantau_di_rumah',
            reasoning: 'Keluhan sakit kepala ringan tanpa gejala tanda bahaya neurologis. Paling sering dipicu kelelahan atau kurang hidrasi.',
            createdAt: new Date().toISOString(),
            doctorSummary: {
              summary: 'Pasien mengeluhkan sakit kepala tegang selama 2 hari dengan intensitas ringan-sedang.',
              threeQuestionsForDoctor: [
                'Apakah keluhan ini membutuhkan pemeriksaan penunjang?',
                'Apakah posisi tidur atau pola layar mempengaruhi kondisi ini?',
                'Kapan saya harus segera kontrol kembali?',
              ],
            },
          },
        ];
        setSessions(initialMock);
      }
    } catch (e) {
      console.warn('Could not read session cache', e);
    }
  }, [user?.id]);

  const getUrgencyBadge = (level: UrgencyLevel) => {
    switch (level) {
      case 'darurat':
        return <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">Darurat (IGD)</span>;
      case 'segera':
        return <span className="rounded-full bg-amber-600 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">Periksa 24 Jam</span>;
      case 'terjadwal':
        return <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">Terjadwal</span>;
      case 'pantau_di_rumah':
      default:
        return <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">Pantau Mandiri</span>;
    }
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 11) return 'Selamat Pagi';
    if (hours < 15) return 'Selamat Siang';
    if (hours < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const userDisplayName = user?.email?.split('@')[0] || 'Teman Sehat';

  return (
    <AuthGuard>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>Dashboard Pasien TenangCek</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                {getGreeting()}, <span className="text-emerald-700 capitalize">{userDisplayName}</span> 👋
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                Kesehatan Anda adalah prioritas. Jangan ragu mencatat keluhan tubuh Anda untuk mendapatkan panduan langkah yang tenang dan terarah.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => signOut()}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition shadow-2xs"
              >
                <LogOut className="h-3.5 w-3.5 text-slate-400" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Card 1: Mulai Cek Gejala */}
          <Link
            href="/checkin"
            className="group relative overflow-hidden rounded-2xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-500 to-emerald-600 p-6 text-white shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs">
                <HeartPulse className="h-6 w-6 text-white" />
              </div>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
            <h2 className="mt-4 text-base font-bold">Mulai Cek Gejala Baru</h2>
            <p className="mt-1 text-xs text-emerald-100 leading-relaxed">
              Ceritakan keluhan Anda secara bertahap dan dapatkan rekomendasi level urgensi dalam 1 menit.
            </p>
          </Link>

          {/* Card 2: Symptom Diary */}
          <Link
            href="/diary"
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition hover:border-emerald-200 hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <BookHeart className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1" />
            </div>
            <h2 className="mt-4 text-base font-bold text-slate-800">Symptom Diary</h2>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Catat perkembangan harian dan ketahui kapan gejala perlu segera dieskalasi ke dokter.
            </p>
          </Link>

          {/* Card 3: Calm Breathing Support */}
          <button
            type="button"
            onClick={() => setShowBreathing(!showBreathing)}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-2xs transition hover:border-emerald-200 hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Wind className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800">
                {showBreathing ? 'Tutup' : 'Buka'}
              </span>
            </div>
            <h2 className="mt-4 text-base font-bold text-slate-800">Latihan Napas Relaksasi</h2>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Rilekskan pikiran dan turunkan detak jantung dengan teknik pernapasan 4-4-6.
            </p>
          </button>
        </div>

        {/* Calm Breathing Exercise Collapsible */}
        {showBreathing && (
          <div className="transition-all duration-300">
            <BreathingExercise />
          </div>
        )}

        {/* Riwayat Sesi Triage */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-600" />
                Riwayat Cek Gejala Anda
              </h2>
              <p className="text-xs text-slate-500">
                Konsultasi sebelumnya tersimpan aman dan terproteksi privasi.
              </p>
            </div>

            <Link
              href="/checkin"
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              + Cek Gejala Lain
            </Link>
          </div>

          {sessions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
              <p className="text-xs text-slate-400">Belum ada riwayat pengecekan gejala.</p>
              <Link
                href="/checkin"
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition"
              >
                Mulai Pengecekan Pertama
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-slate-300 transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800 text-sm">{sess.symptomName}</h3>
                      {sess.duration && (
                        <span className="text-[11px] text-slate-400">({sess.duration})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getUrgencyBadge(sess.urgencyLevel)}
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(sess.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sess.reasoning}
                  </p>

                  {sess.doctorSummary && (
                    <div className="mt-4 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDoctorSummary({
                            summary: sess.doctorSummary!,
                            urgencyLabel: sess.urgencyLevel.replace('_', ' ').toUpperCase(),
                          })
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                      >
                        <FileText className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Buka Ringkasan Dokter</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Doctor Summary Modal Reusable */}
        {selectedDoctorSummary && (
          <DoctorSummaryModal
            doctorSummary={selectedDoctorSummary.summary}
            urgencyLabel={selectedDoctorSummary.urgencyLabel}
            onClose={() => setSelectedDoctorSummary(null)}
          />
        )}
      </div>
    </AuthGuard>
  );
}
