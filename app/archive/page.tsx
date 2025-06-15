'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function ArchivePage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from('archives')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setData(data || []));
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">📁 전체 자료</h1>

      {data.map((item) => (
        <div
          key={item.id}
          className="bg-gray-50 hover:bg-gray-100 transition rounded-md p-5 mb-6 border border-gray-200 shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">{item.title}</h2>
          <p className="text-xs text-gray-500 mb-2">
            {new Date(item.created_at).toLocaleString()}
          </p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.content}</p>

          <div className="mt-3 text-right">
            <Link
              href={`/edit?id=${item.id}`}
              className="inline-block text-sm text-blue-600 hover:text-blue-800 underline"
            >
              ✏️ 수정하기
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
