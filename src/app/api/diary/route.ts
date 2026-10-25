import { NextResponse } from 'next/server';
import { DiaryEntry } from '@/types/user';

// Mock storage in-memory bila database Supabase belum terhubung
const localDiaryStore: DiaryEntry[] = [
  {
    id: 'entry-1',
    note: 'Sakit kepala mulai berkurang setelah istirahat siang dan minum air hangat.',
    severity: 2,
    symptoms: ['Sakit kepala'],
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: localDiaryStore });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newEntry: DiaryEntry = {
      id: `entry-${Date.now()}`,
      note: body.note || 'Catatan gejala harian',
      severity: body.severity ?? 3,
      symptoms: body.symptoms || [],
      created_at: new Date().toISOString(),
    };

    localDiaryStore.unshift(newEntry);

    return NextResponse.json({ success: true, data: newEntry });
  } catch (error) {
    console.error('API /api/diary error:', error);
    return NextResponse.json({ error: 'Gagal mencatat diary' }, { status: 500 });
  }
}
