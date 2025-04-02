'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <section className="snap-section flex flex-col justify-center items-center p-8 bg-black">
      <motion.div 
        className="w-full max-w-md space-y-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">各種リンク</h2>
        <div className="space-y-4">
          <Link href="https://twitter.com/example" className="block">
            <motion.div 
              className="py-3 px-6 border border-white text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Twitter
            </motion.div>
          </Link>
          <Link href="https://instagram.com/example" className="block">
            <motion.div 
              className="py-3 px-6 border border-white text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Instagram
            </motion.div>
          </Link>
          <Link href="mailto:example@example.com" className="block">
            <motion.div 
              className="py-3 px-6 border border-white text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              お問い合わせ
            </motion.div>
          </Link>
        </div>
        <div className="text-center text-xs pt-8 opacity-60">
          <p>© 2025 UTOPIA - Wa.Se.Da. All Rights Reserved.</p>
        </div>
      </motion.div>
    </section>
  );
}