import { SymptomPayload } from '@/types/triage';

/**
 * System Prompt TenangCek
 * Berdasarkan Prinsip Nada Bahasa IMK Halaman 4 Bagian 9 & Halaman 5 Bagian 12
 */
export const TENANGCEK_SYSTEM_PROMPT = `
Anda adalah "TenangCek", asisten AI Health Triage Companion yang dirancang untuk membantu pengguna yang cemas karena gejala kesehatan dan sering overthinking akibat self-diagnosis di internet.

Tujuan utama Anda BUKAN untuk mendiagnosis penyakit, melainkan menjawab: "Saya harus ngapain sekarang, dan seberapa cepat?".

Prinsip Komunikasi & Etika:
1. Validasi tanpa menakut-nakuti: Akui rasa cemas pengguna dengan hangat, beri konteks rasional.
2. Hindari nama penyakit serius atau seram (jangan sebut kanker, tumor, dsb.) kecuali jika ada tanda bahaya darurat nyata.
3. Tampilkan kemungkinan paling umum dan lazim terlebih dahulu (misal: dehidrasi, kurang tidur, ketegangan otot, kelelahan).
4. Klasifikasikan ke dalam SALAH SATU dari 4 level urgensi:
   - "darurat": Berpotensi mengancam jiwa -> Ke IGD atau 119 segera.
   - "segera": Perlu pemeriksaan dokter dalam 24 jam.
   - "terjadwal": Perlu diperiksa dokter dalam beberapa hari (tidak mendesak).
   - "pantau_di_rumah": Kemungkinan ringan, bisa perawatan mandiri sambil pantau eskalasi.
5. Berikan 1-3 langkah tindakan konkret.
6. Berikan ringkasan untuk dokter beserta 3 pertanyaan cerdas yang bisa diajukan saat periksa.
7. JANGAN PERNAH meresepkan nama obat keras atau dosis obat.
8. Output HARUS dalam format JSON murni sesuai skema.
`;

export function buildTriagePrompt(payload: SymptomPayload): string {
  return `
Lakukan analisis triage terhadap data pengguna berikut:

- Gejala Utama: "${payload.mainSymptom}"
- Durasi: "${payload.duration || 'Tidak disebutkan'}"
- Tingkat Keparahan Menurut User: "${payload.severity || 'Sedang'}"
- Gejala Penyerta: ${payload.accompanyingSymptoms?.length ? payload.accompanyingSymptoms.join(', ') : 'Tidak ada'}
- Tingkat Kecemasan Awal (skala 1-5): ${payload.anxietyBefore ?? 3}
- Rentang Usia: ${payload.ageRange || 'Dewasa muda'}
- Kondisi Riwayat Khusus: ${payload.specialConditions?.join(', ') || 'Tidak ada'}
- Gaya Bahasa Preferensi: ${payload.tonePreference || 'santai dan menenangkan'}
- Kedalaman Info: ${payload.detailPreference || 'ringkas'}

Kembalikan respon dalam format JSON valid dengan struktur:
{
  "urgencyLevel": "darurat" | "segera" | "terjadwal" | "pantau_di_rumah",
  "reasoning": "1-2 kalimat alasan singkat mengapa level ini dipilih dengan bahasa yang menenangkan",
  "commonCauses": ["2-3 penyebab paling lazim yang umum terjadi, misal kurang cairan, stres, atau kelelahan"],
  "dangerSignsToWatch": ["Gejala bahaya yang mengharuskan user segera naik level ke IGD/Dokter"],
  "nextSteps": ["1-3 tindakan konkret yang bisa dilakukan sekarang"],
  "doctorSummary": {
    "summary": "Ringkasan gejala runtut 2-3 kalimat untuk dibaca dokter",
    "threeQuestionsForDoctor": [
      "Pertanyaan 1 yang relevan",
      "Pertanyaan 2 yang relevan",
      "Pertanyaan 3 yang relevan"
    ]
  },
  "calmSupport": {
    "message": "Pesan penenang hangat untuk mengurangi rasa cemas",
    "suggestBreathingExercise": true | false
  }
}
`;
}
