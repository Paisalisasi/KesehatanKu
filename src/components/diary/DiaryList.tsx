'use client';

import React, { useState, useEffect } from 'react';
import { DiaryEntry } from '@/types/user';
import { Calendar, Plus, Clock, Smile, AlertCircle, BookHeart } from 'lucide-react';

export default function DiaryList() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [note, setNote] = useState('');
  const [severity, setSeverity] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/diary');
      const json = await res.json();
      if (json.success) {
        setEntries(json.data);
      }
    } catch (err) {
      console.error('Failed to load diary entries', err);
    }
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note, severity }),
      });
      const json = await res.json();
      if (json.success) {
        setEntries([json.data, ...entries]);
        setNote('');
        setSeverity(2);
      }
    } catch (err) {
      console.error('Failed to save entry', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSeverityBadge = (sev: number) => {
    if (sev <= 2) {
      return <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Ringan ({sev}/5)</span>;
    } else if (sev === 3) {
      return <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">Sedang ({sev}/5)</span>;
    } else {
      return <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">Berat ({sev}/5)</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Tambah Catatan */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
          <BookHeart className="h-4 w-4 text-emerald-600" />
          Catat Perkembangan Gejala Hari Ini
        </h3>

        <form onSubmit={handleAddEntry} className="space-y-3">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="Misal: Sudah tidur 8 jam, sakit kepala mereda tapi masih terasa sedikit di pelipis kanan..."
            className="w-full rounded-xl border border-slate-300 p-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Tingkat keparahan (1-5):</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeverity(s)}
                    className={`h-7 w-7 rounded-lg text-xs font-bold transition ${
                      severity === s
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !note.trim()}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Simpan Catatan</span>
            </button>
          </div>
        </form>
      </div>

      {/* Daftar Catatan Gejala */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Riwayat Catatan Diary ({entries.length})
        </h3>

        {entries.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-400">
            Belum ada catatan gejala. Catat perkembangan harian Anda untuk memantau perbaikan.
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {new Date(entry.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {getSeverityBadge(entry.severity)}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{entry.note}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
