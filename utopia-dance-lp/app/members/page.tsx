// app/members/page.tsx
'use client';

import { motion } from 'framer-motion';

export const metadata = {
  title: 'メンバー名簿', // ページタイトルとして表示されます
};

export default function MembersPage() {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center bg-black text-white p-8'>
      <motion.h1
        className='text-4xl md:text-6xl font-bold mb-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        メンバー名簿
      </motion.h1>
      {/* ここに実際のメンバー情報や一覧を表示する */}
      <p className='text-lg md:text-2xl'>ここにメンバー情報を表示します。</p>
    </section>
  );
}
