'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function HomePage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from('archives')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
      .then(({ data }) => setData(data || []));
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">타임라인</h1>

      <Link href="/submit" className="text-blue-600 underline mb-4 block">
        + 새 자료 등록
      </Link>

      {data.map((item) => (
        <div key={item.id} className="border-b py-4">
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
          <p>{item.content}</p>
        </div>
      ))}

      <Link href="/archive" className="text-blue-600 underline mt-4 block">
        전체 보기 →
      </Link>
    </main>
  );
}
