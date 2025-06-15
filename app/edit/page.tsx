'use client';

export const dynamic = "force-dynamic";

import { Suspense } from 'react';
import EditClient from './EditClient';

export default function EditPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">불러오는 중...</p>}>
      <EditClient />
    </Suspense>
  );
}
