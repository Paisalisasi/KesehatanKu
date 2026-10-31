import React from 'react';
import StepChat from '@/components/triage/StepChat';
import AuthGuard from '@/components/auth/AuthGuard';

export default function CheckinPage() {
  return (
    <AuthGuard>
      <StepChat />
    </AuthGuard>
  );
}
