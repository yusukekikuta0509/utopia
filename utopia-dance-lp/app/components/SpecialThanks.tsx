'use client';

import { motion } from 'framer-motion';

export default function SpecialThanks() {
  return (
    <section className="snap-section flex flex-col justify-center items-center p-8 bg-black">
      <motion.div 
        className="max-w-md space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Special Thanks</h2>
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            本公演の開催にあたり、多くの方々にご支援いただきました。心より感謝申し上げます。
          </p>
          <ul className="text-sm space-y-2">
            <li>○○○様 - 会場提供</li>
            <li>○○○様 - 機材協力</li>
            <li>○○○様 - 衣装提供</li>
            <li>○○○サークル - 技術協力</li>
            <li>ご来場いただいた皆様</li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}