'use client';

import React from 'react';
import { Smile, Meh, Frown, AlertCircle } from 'lucide-react';

interface Props {
  value: number;
  onChange: (val: number) => void;
  label?: string;
  sublabel?: string;
}

export default function AnxietySlider({ value, onChange, label, sublabel }: Props) {
  const levels = [
    { num: 1, label: 'Sangat Tenang', icon: '😌', color: 'text-emerald-600' },
    { num: 2, label: 'Sedikit Khawatir', icon: '🙂', color: 'text-teal-600' },
    { num: 3, label: 'Cukup Cemas', icon: '😐', color: 'text-amber-600' },
    { num: 4, label: 'Cemas Tinggi', icon: '😟', color: 'text-orange-600' },
    { num: 5, label: 'Sangat Panik', icon: '😰', color: 'text-rose-600' },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="text-center mb-4">
        <h4 className="text-sm font-bold text-slate-800">
          {label || 'Seberapa cemas Anda mengenai gejala ini saat ini?'}
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          {sublabel || 'Skala 1 (Sangat Tenang) hingga 5 (Sangat Panik)'}
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {levels.map((item) => {
          const isSelected = value === item.num;
          return (
            <button
              key={item.num}
              type="button"
              onClick={() => onChange(item.num)}
              className={`flex flex-col items-center justify-center rounded-xl p-3 transition-all ${
                isSelected
                  ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs'
                  : 'border border-slate-100 bg-slate-50/70 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-bold">{item.num}</span>
              <span className="text-[10px] text-center hidden sm:inline leading-tight mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
