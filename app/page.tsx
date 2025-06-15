'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function HomePage() {
  const [archives, setArchives] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('archives')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setArchives(data || []);
    };

    fetchData();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">📚 최근 자료</h1>

      <div className="mb-4">
        <Link
          href="/submit"
          className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          + 새 자료 등록
        </Link>
      </div>

      {archives.length === 0 && <p>등록된 자료가 없습니다.</p>}

      {archives.map((entry) => (
        <div key={entry.id} className="border-b py-4">
          <h2 className="text-lg font-semibold">{entry.title}</h2>
          <p className="text-sm text-gray-600">
            {new Date(entry.created_at).toLocaleString()}
          </p>
          <p>{entry.content}</p>
        </div>
      ))}

      <div className="mt-6">
        <Link href="/archive" className="text-blue-600 underline">
          전체 보기 →
        </Link>
      </div>
    </main>
  );
}
