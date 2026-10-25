import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <aside aria-label="Disclaimer Medis" className="w-full bg-amber-50/90 border-b border-amber-200/80 px-4 py-2.5 text-xs text-amber-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
          <p>
            <span className="font-semibold">Disclaimer Medis:</span> TenangCek adalah alat bantu informasi penentuan urgensi dan <strong>bukan pengganti diagnosis dokter atau tenaga medis resmi</strong>. Bila mengalami keadaan darurat, segera ke IGD atau hubungi <strong>119</strong>.
          </p>
        </div>
      </div>
    </aside>
  );
}
