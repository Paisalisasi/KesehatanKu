'use client';

import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RefreshCw } from 'lucide-react';

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'tarik' | 'tahan' | 'hembuskan'>('tarik');
  const [secondsLeft, setSecondsLeft] = useState(4);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (phase === 'tarik') {
            setPhase('tahan');
            return 4;
          } else if (phase === 'tahan') {
            setPhase('hembuskan');
            return 6;
          } else {
            setPhase('tarik');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 'tarik':
        return 'Tarik Napas Perlahan...';
      case 'tahan':
        return 'Tahan Sebentar...';
      case 'hembuskan':
        return 'Hembuskan Napas Rileks...';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'tarik':
        return 'bg-emerald-500 scale-125';
      case 'tahan':
        return 'bg-teal-500 scale-125';
      case 'hembuskan':
        return 'bg-sky-400 scale-100';
    }
  };

  return (
    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-teal-50/40 p-6 text-center shadow-sm">
      <div className="flex items-center justify-center gap-2 text-emerald-800 font-semibold text-sm mb-2">
        <Wind className="h-4 w-4" />
        <span>Calm Support: Latihan Napas Sejenak</span>
      </div>
      <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
        Jika Anda merasa tegang atau cemas, luangkan 1 menit untuk mengatur ritme napas agar detak jantung dan pikiran lebih tenang.
      </p>

      {/* Visual Circle */}
      <div className="relative flex h-44 w-44 mx-auto items-center justify-center">
        <div
          className={`absolute h-36 w-36 rounded-full transition-all duration-1000 ease-in-out opacity-20 ${
            isActive ? getPhaseColor() : 'bg-emerald-300 scale-100'
          }`}
        />
        <div
          className={`flex h-28 w-28 flex-col items-center justify-center rounded-full text-white shadow-md transition-all duration-1000 ease-in-out ${
            isActive ? getPhaseColor() : 'bg-emerald-600 scale-100'
          }`}
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            {isActive ? phase : 'Mulai'}
          </span>
          <span className="text-2xl font-bold">{isActive ? secondsLeft : '4s'}</span>
        </div>
      </div>

      <div className="mt-4 font-medium text-slate-700 text-sm h-6">
        {isActive ? getPhaseText() : 'Tekan tombol untuk memulai latihan napas'}
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
        >
          {isActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {isActive ? 'Jeda' : 'Mulai Latihan'}
        </button>

        {isActive && (
          <button
            type="button"
            onClick={() => {
              setPhase('tarik');
              setSecondsLeft(4);
            }}
            className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
