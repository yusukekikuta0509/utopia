import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

const genres = [
  { id: 'M1', name: 'BREAK' },
  { id: 'M2', name: 'GIRLS' },
  { id: 'M3', name: 'NEW' },
  { id: 'M4', name: 'MIDDLE' },
  { id: 'M5', name: 'LOCK' },
  { id: 'M6', name: 'WACK' },
  { id: 'M7', name: 'JAZZ' },
  { id: 'M8', name: 'HOUSE' },
  { id: 'M9', name: 'POP' },
  { id: 'M10', name: 'R&B' },
  { id: 'M11', name: 'STYLE' }
];

export default function DanceGenreIndex() {
  return (
    <section className="snap-section flex flex-col justify-center items-center p-8 bg-black">
      <motion.div 
        className="w-full max-w-md space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">ダンスジャンル</h2>
        <div className="grid grid-cols-1 gap-4">
          {genres.map((genre) => (
            <Link 
              href={`/genre/${genre.id.toLowerCase()}`} 
              key={genre.id}
              className="block"
            >
              <motion.div 
                className="flex items-center justify-between border-b border-gray-700 py-3"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <span className="text-lg">{genre.id}</span>
                <span className="text-lg">{genre.name}</span>
                <span className="text-lg">→</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
