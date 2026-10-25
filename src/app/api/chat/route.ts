import { NextResponse } from 'next/server';
import { ChatStep } from '@/types/triage';

/**
 * Endpoint pertanyaan bertahap (Symptom Check-in step flow)
 * Menampilkan 1 pertanyaan per langkah agar tidak membebani kognitif user (IMK Focus)
 */
export async function GET() {
  const steps: ChatStep[] = [
    {
      step: 1,
      id: 'main_symptom',
      question: 'Apa gejala atau keluhan utama yang paling Anda rasakan saat ini?',
      helperText: 'Ceritakan dengan kata-kata santai, atau pilih gejala umum di bawah.',
      quickOptions: ['Sakit Kepala', 'Demam', 'Batuk & Pilek', 'Nyeri Perut', 'Pusing / Kleyengan', 'Mual'],
      type: 'text',
    },
    {
      step: 2,
      id: 'duration',
      question: 'Sudah berapa lama gejala tersebut Anda rasakan?',
      helperText: 'Durasi membantu menentukan seberapa cepat langkah penanganan yang dibutuhkan.',
      quickOptions: ['Baru beberapa jam', '1 - 2 hari', '3 - 5 hari', 'Lebih dari 1 minggu'],
      type: 'options',
    },
    {
      step: 3,
      id: 'severity',
      question: 'Seberapa besar gejala ini mengganggu aktivitas sehari-hari Anda?',
      helperText: 'Pilih tingkat keparahan yang paling menggambarkan kondisi Anda saat ini.',
      quickOptions: [
        'Ringan (masih bisa beraktivitas biasa)',
        'Sedang (cukup mengganggu, butuh istirahat sesekali)',
        'Berat (sangat mengganggu, sulit beraktivitas)',
      ],
      type: 'options',
    },
    {
      step: 4,
      id: 'accompanying',
      question: 'Apakah ada gejala lain yang menyertai keluhan Anda?',
      helperText: 'Tuliskan gejala tambahan jika ada, atau pilih jika tidak ada.',
      quickOptions: ['Tidak ada gejala lain', 'Lemas / lesu', 'Nafsu makan turun', 'Nyeri otot / pegal', 'Sulit tidur'],
      type: 'text',
    },
    {
      step: 5,
      id: 'anxiety',
      question: 'Sebelum melihat hasil, seberapa cemas yang Anda rasakan terkait kondisi ini? (Skala 1 - 5)',
      helperText: '1 = Sangat tenang, 5 = Sangat cemas / overthinking.',
      quickOptions: ['1 - Tenang', '2 - Sedikit khawatir', '3 - Cukup cemas', '4 - Cemas tinggi', '5 - Sangat panik'],
      type: 'rating',
    },
  ];

  return NextResponse.json({ success: true, steps });
}
