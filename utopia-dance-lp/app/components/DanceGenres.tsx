'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export interface DanceGenreProps {
  id: string;
  name: string;
  choreographer: string;
  performers: string[];
}

const DanceGenre: React.FC<DanceGenreProps> = ({ id, name, choreographer, performers }) => {
  // 万が一 id が undefined の場合を防ぐ（基本的にはデータ側を修正してください）
  const safeId = id || 'default';

  return (
    <section className="snap-section flex flex-col bg-black">
      <div className="h-1/2 relative overflow-hidden">
        <Image
          src={`/images/${safeId.toLowerCase()}.jpg`}
          alt={`${name} dance`}
          fill
          className="grayscale"
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold">{name}</h2>
        </motion.div>
      </div>
      <div className="h-1/2 relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale"
        >
          <source src={`/videos/${safeId.toLowerCase()}.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center p-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xl">{safeId} OO</p>
            <p className="text-lg">振り師: {choreographer}</p>
            <div>
              <p className="text-sm mb-2">出演者:</p>
              <p className="text-xs">{performers.join(', ')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DanceGenre;
