// app/components/ExecutiveGreeting.tsx
'use client';

import { motion } from 'framer-motion';

export default function ExecutiveGreeting() {
  return (
    <section className="snap-section flex flex-col justify-center items-center p-8 bg-black">
      <motion.div 
        className="max-w-md space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">幹部挨拶</h2>
        <p className="text-sm leading-relaxed">
          この度は私たちの公演「UTOPIA」にお越しいただき、誠にありがとうございます。
          本公演では、様々なジャンルのダンスを通して、理想郷（ユートピア）というテーマを
          表現していきます。日常から離れ、ひと時の夢のような空間をお楽しみください。
        </p>
        <p className="text-sm text-right">代表 ○○○○</p>
      </motion.div>
    </section>
  );
}
