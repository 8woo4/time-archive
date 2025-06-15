'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function EditClient() {
  const params = useSearchParams();
  const id = params.get('id');
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!id) return;
    supabase
      .from('archives')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setContent(data.content || '');
        }
      });
  }, [id]);

  const handleUpdate = async () => {
    if (!title || !id) return alert('제목과 ID는 필수입니다.');
    const { error } = await supabase
      .from('archives')
      .update({ title, content })
      .eq('id', id);
    if (!error) router.push('/');
    else alert('수정 실패: ' + error.message);
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">✏️ 글 수정</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full h-40 mb-2 rounded"
      />
      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        수정 완료
      </button>
    </main>
  );
}
