'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LogoDesign() {
  return (
    <section className="snap-section flex flex-col justify-center items-center p-8 bg-black">
      <motion.div 
        className="max-w-md space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">ロゴデザイン</h2>
        <div className="py-4">
          <Image 
            src="/logo-design.png" 
            alt="UTOPIA Logo Design" 
            width={300} 
            height={150}
            className="mx-auto grayscale"
          />
        </div>
        <p className="text-sm leading-relaxed">
          UTOPIAのロゴデザインは、水面の揺らぎから着想を得ています。
          理想と現実の境界線が曖昧に揺れ動く様子を表現し、モノクロの世界観で
          鮮明さと幻想性を両立させています。
        </p>
      </motion.div>
    </section>
  );
}
