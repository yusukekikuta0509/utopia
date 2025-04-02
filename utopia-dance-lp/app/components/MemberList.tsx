'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MemberList() {
  return (
    <section className="snap-section flex flex-col justify-center items-center p-8 bg-black">
      <motion.div 
        className="w-full max-w-md space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">名簿一覧</h2>
        <Link href="/members" className="block">
          <motion.div 
            className="py-4 px-6 border border-white text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            メンバー名簿を見る
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}