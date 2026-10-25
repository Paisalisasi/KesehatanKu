'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { 
  HeartPulse, 
  ShieldAlert, 
  Sparkles, 
  BookHeart, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Wind,
  ShieldCheck,
  AlertTriangle,
  Stethoscope,
  Globe2,
  Users,
  Clock,
  PhoneCall,
  LayoutDashboard,
  Check
} from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center">
      {/* 1. HERO SECTION */}
      <section className="w-full bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-2xs mb-6">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>AI Health Triage Companion • Interaksi Manusia dan Komputer (IMK)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Putuskan Langkah Berikutnya <br className="hidden sm:inline" />
            <span className="text-emerald-600">dengan Tenang</span>, Bukan Menebak Penyakit.
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            TenangCek adalah web app yang membantu Anda yang sering <em>self-diagnose</em> lewat internet dan berakhir cemas berlebih. Alih-alih menebak nama penyakit seram, sistem membantu Anda menjawab pertanyaan yang jauh lebih berguna: <br />
            <strong className="text-slate-800 font-semibold">"Saya harus ngapain sekarang, dan seberapa cepat?"</strong>
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 transition"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Buka Dashboard Saya</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/auth?redirect=/dashboard"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 transition"
              >
                <HeartPulse className="h-5 w-5" />
                <span>Masuk / Buat Akun untuk Cek Gejala</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            <a
              href="#alur"
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
            >
              <span>Pelajari Cara Kerja</span>
            </a>
          </div>

          {/* 5 Alur Utama Chip Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-slate-500">
            <span className="rounded-lg bg-white px-3 py-1.5 border border-slate-200 shadow-2xs">1. Ceritakan Gejala</span>
            <span className="text-slate-300">→</span>
            <span className="rounded-lg bg-white px-3 py-1.5 border border-slate-200 shadow-2xs">2. Triage Urgensi</span>
            <span className="text-slate-300">→</span>
            <span className="rounded-lg bg-white px-3 py-1.5 border border-slate-200 shadow-2xs">3. Pahami Alasannya</span>
            <span className="text-slate-300">→</span>
            <span className="rounded-lg bg-white px-3 py-1.5 border border-slate-200 shadow-2xs">4. Ambil Langkah</span>
            <span className="text-slate-300">→</span>
            <span className="rounded-lg bg-white px-3 py-1.5 border border-slate-200 shadow-2xs">5. Pantau Perkembangan</span>
          </div>
        </div>
      </section>

      {/* 2. SECTION #tentang: LATAR BELAKANG & MASALAH */}
      <section id="tentang" className="w-full py-16 px-4 sm:px-6 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Latar Belakang & Masalah
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Mengapa Googling Gejala Sering Bikin Kita Tambah Panik?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Fenomena <em>cyberchondria</em> terjadi saat pencarian gejala di mesin pencari justru memicu kecemasan berlebih akibat informasi yang bias ke kemungkinan terburuk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-6 space-y-3">
              <h3 className="text-base font-bold text-rose-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-500" />
                Problem Saat Mencari Gejala di Internet:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-950/80">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span><strong>Bias ke skenario terburuk:</strong> Sakit kepala biasa sering langsung dikaitkan dengan tumor otak atau penyakit mematikan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span><strong>Tidak ada panduan waktu:</strong> Pengguna tidak tahu kapan gejala cukup dipantau di rumah dan kapan harus segera ke faskes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span><strong>Bingung memilih faskes:</strong> Pasien bingung apakah harus ke puskesmas, klinik dokter umum, spesialis, atau IGD.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span><strong>Susah menjelaskan ke dokter:</strong> Saat akhirnya periksa, pasien bingung menyusun riwayat gejala secara runtut.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 space-y-3">
              <h3 className="text-base font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Pendekatan TenangCek:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950/80">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Bukan menebak nama penyakit:</strong> Menghindari diagnosis seram dan mendahulukan kemungkinan paling lazim (dehidrasi, kurang tidur, lelah).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Level urgensi yang jelas:</strong> Memberi kepastian rentang waktu tindakan (Sekarang, 24 jam, beberapa hari, atau rawat mandiri).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Calm Support & nada bahasa jujur:</strong> Bahasa dirancang untuk memvalidasi rasa cemas tanpa menakut-nakuti, dilengkapi latihan napas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Ringkasan untuk dokter:</strong> Menyiapkan 3 pertanyaan konkret dan ringkasan runtut siap salin saat bertemu nakes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION #alur: 5 PILAR ALUR TENANGCEK */}
      <section id="alur" className="w-full py-16 px-4 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Arsitektur Alur Sistem
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
              5 Langkah Menuju Ketenangan & Tindakan Nyata
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Setiap langkah dirancang dengan beban kognitif rendah agar pengguna yang sedang cemas tetap dapat berpikir jernih.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-xs font-bold text-emerald-700 mb-3">
                01
              </span>
              <h3 className="font-bold text-slate-800 text-sm">Describe</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Ceritakan gejala utama, durasi, keparahan, dan gejala penyerta secara bertahap satu per satu.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-100 text-xs font-bold text-teal-700 mb-3">
                02
              </span>
              <h3 className="font-bold text-slate-800 text-sm">Triage</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Pemeriksaan tanda bahaya (*Red Flag*) deterministik, dilanjutkan penentuan 1 dari 4 level urgensi.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-xs font-bold text-blue-700 mb-3">
                03
              </span>
              <h3 className="font-bold text-slate-800 text-sm">Understand</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Pahami alasan rasional mengapa level tersebut dipilih, disertai kemungkinan penyebab yang paling lazim.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-xs font-bold text-amber-700 mb-3">
                04
              </span>
              <h3 className="font-bold text-slate-800 text-sm">Act</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Lakukan 1-3 tindakan konkret, latihan napas relaksasi, dan salin ringkasan pertanyaan untuk dokter.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-xs font-bold text-purple-700 mb-3">
                05
              </span>
              <h3 className="font-bold text-slate-800 text-sm">Track</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Catat perkembangan harian di <em>Symptom Diary</em> untuk mendeteksi apakah gejala membaik atau perlu eskalasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION #urgensi: 4 LEVEL URGENSI */}
      <section id="urgensi" className="w-full py-16 px-4 sm:px-6 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Desain Feedback IMK
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
              4 Level Urgensi yang Terarah & Bebas Ambiguitas
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Hasil ditampilkan dalam klasifikasi tindakan yang jelas sehingga pengguna langsung tahu apa yang harus dilakukan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Darurat */}
            <div className="rounded-2xl border-2 border-rose-400 bg-rose-50/70 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-rose-600 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                  Darurat
                </span>
                <h3 className="mt-3 font-bold text-base text-rose-950">Berpotensi Mengancam Nyawa</h3>
                <p className="mt-2 text-xs text-rose-800 leading-relaxed">
                  Gejala cocok dengan tanda bahaya (*red flag* akut) yang membutuhkan intervensi medis langsung tanpa ditunda.
                </p>
              </div>
              <div className="mt-5 rounded-xl bg-white/90 p-3 border border-rose-200 text-xs font-semibold text-rose-900">
                🚨 Tindakan: Ke IGD terdekat sekarang atau hubungi 119 segera.
              </div>
            </div>

            {/* 2. Segera */}
            <div className="rounded-2xl border-2 border-amber-400 bg-amber-50/70 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-amber-600 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                  Segera
                </span>
                <h3 className="mt-3 font-bold text-base text-amber-950">Pemeriksaan Waktu Dekat</h3>
                <p className="mt-2 text-xs text-amber-800 leading-relaxed">
                  Kondisi terasa berat atau telah berlangsung berhari-hari tanpa perbaikan, perlu dievaluasi oleh dokter umum.
                </p>
              </div>
              <div className="mt-5 rounded-xl bg-white/90 p-3 border border-amber-200 text-xs font-semibold text-amber-900">
                ⏰ Tindakan: Periksa ke klinik / dokter umum dalam 24 jam.
              </div>
            </div>

            {/* 3. Terjadwal */}
            <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/70 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                  Terjadwal
                </span>
                <h3 className="mt-3 font-bold text-base text-blue-950">Perlu Dicek (Tidak Mendesak)</h3>
                <p className="mt-2 text-xs text-blue-800 leading-relaxed">
                  Keluhan lazim yang tidak mengancam jiwa namun memerlukan observasi medis terjadwal dalam beberapa hari.
                </p>
              </div>
              <div className="mt-5 rounded-xl bg-white/90 p-3 border border-blue-200 text-xs font-semibold text-blue-900">
                📅 Tindakan: Buat janji temu dokter dalam 2-3 hari ke depan.
              </div>
            </div>

            {/* 4. Pantau di Rumah */}
            <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/70 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                  Pantau di Rumah
                </span>
                <h3 className="mt-3 font-bold text-base text-emerald-950">Kemungkinan Kondisi Ringan</h3>
                <p className="mt-2 text-xs text-emerald-800 leading-relaxed">
                  Gejala umum yang dapat pulih dengan istirahat, cairan cukup, dan perawatan mandiri sambil mewaspadai tanda eskalasi.
                </p>
              </div>
              <div className="mt-5 rounded-xl bg-white/90 p-3 border border-emerald-200 text-xs font-semibold text-emerald-900">
                🏡 Tindakan: Istirahat cukup, hidrasi, dan catat di Diary.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TARGET PERSONA & RELEVANSI SDG */}
      <section className="w-full py-16 px-4 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Target Persona */}
          <div>
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Target Pengguna
              </span>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
                Didesain untuk 3 Karakteristik Persona
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-2xs">
                <span className="text-3xl mb-3 block">😰</span>
                <h3 className="font-bold text-slate-800 text-sm">Si Cemas</h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Sering *overthinking* setelah membaca hasil Google. Membutuhkan kepastian tentang seberapa mendesak kondisinya dengan nada bahasa menenangkan dan latihan relaksasi napas.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-2xs">
                <span className="text-3xl mb-3 block">🤔</span>
                <h3 className="font-bold text-slate-800 text-sm">Si Bingung</h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Tidak tahu harus berobat ke mana dan kapan. Membutuhkan panduan konkrit mengenai langkah awal, jenis faskes (Puskesmas / Klinik / IGD), dan ringkasan pertanyaan yang bisa diajukan ke nakes.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-2xs">
                <span className="text-3xl mb-3 block">⏳</span>
                <h3 className="font-bold text-slate-800 text-sm">Si Menunda</h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Cenderung meremehkan atau menunda pengobatan gejala. Membutuhkan pengingat konkret (*red flag detector*) kapan suatu gejala berbahaya dan wajib segera diperiksa.
                </p>
              </div>
            </div>
          </div>

          {/* SDG Relevansi */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
              <Globe2 className="h-4 w-4" />
              <span>Dampak Sosial & Tujuan Pembangunan Berkelanjutan (SDG)</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Relevansi dengan Agenda Global
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="rounded-xl bg-emerald-50/50 p-4 border border-emerald-100">
                <strong className="text-emerald-900 block mb-1">SDG 3: Good Health and Well-being</strong>
                Mendukung akses informasi kesehatan yang tepat, pengambilan keputusan rujukan ke faskes secara rasional, serta menjaga kesejahteraan mental pengguna dari kepanikan akibat *self-diagnosis*.
              </div>
              <div className="rounded-xl bg-teal-50/50 p-4 border border-teal-100">
                <strong className="text-teal-900 block mb-1">SDG 10: Reduced Inequalities</strong>
                Membantu pemerataan akses informasi triase awal bagi masyarakat yang jauh dari fasilitas kesehatan atau memiliki tingkat literasi kesehatan yang terbatas.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION #disclaimer: DISCLAIMER MEDIS & BATASAN ETIKA */}
      <section id="disclaimer" className="w-full py-16 px-4 sm:px-6 bg-amber-50/60 border-t border-amber-200">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 text-amber-800 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Disclaimer Medis & Batasan Etika Sistem
                </h2>
                <p className="text-xs text-slate-500">
                  Prinsip keselamatan, privasi, dan batasan operasional TenangCek
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="rounded-xl bg-amber-50/70 p-4 border border-amber-200">
                <h4 className="font-bold text-amber-950 mb-1">1. Bukan Pengganti Diagnosis Medis</h4>
                <p>
                  TenangCek adalah alat bantu triase informasi edukatif dan <strong>TIDAK mendiagnosis penyakit secara pasti</strong>. Hasil yang diberikan adalah rekomendasi tindakan awal dan tidak menggantikan pemeriksaan langsung oleh dokter atau tenaga kesehatan profesional.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">2. Tidak Meresepkan Obat atau Dosis</h4>
                <p>
                  Sistem tidak pernah memberikan rekomendasi nama obat keras, antibiotik, atau dosis farmakologis tertentu. Segala bentuk pengobatan wajib dikonsultasikan langsung ke apoteker atau dokter yang berwenang.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">3. Perlindungan Privasi & Keamanan Data</h4>
                <p>
                  Data keluhan kesehatan Anda tersimpan dengan perlindungan enkripsi <em>Row Level Security (RLS)</em> di database Supabase, dan hanya dapat dibaca oleh akun Anda sendiri.
                </p>
              </div>

              <div className="rounded-xl bg-rose-50 p-4 border border-rose-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-rose-900">
                  <PhoneCall className="h-5 w-5 text-rose-600 shrink-0" />
                  <div>
                    <h4 className="font-bold">Layanan Kedaruratan Medis Nasional</h4>
                    <p className="text-xs text-rose-800">Bila terjadi sesak napas berat, nyeri dada hebat, atau penurunan kesadaran, hubungi:</p>
                  </div>
                </div>
                <a
                  href="tel:119"
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-rose-700 transition"
                >
                  Hubungi 119 (Ambulans)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA BANNER */}
      <section className="w-full py-16 px-4 sm:px-6 bg-white border-t border-slate-200 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Siap Mengambil Langkah dengan Tenang?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Masuk atau buat akun pribadi Anda untuk mulai mengecek keluhan kesehatan dan menyimpan catatan perkembangan harian secara aman.
          </p>

          <div className="mt-6 flex justify-center">
            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 transition"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Masuk ke Dashboard Saya</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/auth?redirect=/dashboard"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 transition"
              >
                <HeartPulse className="h-5 w-5" />
                <span>Mulai Cek Gejala (Masuk Akun)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
