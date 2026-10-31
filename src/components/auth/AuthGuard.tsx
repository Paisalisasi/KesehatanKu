'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
}

/**
 * AuthGuard (Mode Akses Langsung / Tamu):
 * Mengizinkan akses langsung ke Dashboard, Checkin, dan Diary tanpa wajib login terlebih dahulu.
 */
export default function AuthGuard({ children }: Props) {
  return <>{children}</>;
}
