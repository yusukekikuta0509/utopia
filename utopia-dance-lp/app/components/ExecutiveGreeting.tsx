'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ExecutiveGreeting() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  // インラインスタイルを多用して外部CSSの影響を受けにくくする
  const sectionStyle = {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    overflow: 'hidden',
  };

  const videoContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  };

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.6,
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  };

  const contentContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999, // 非常に高い値を設定
  };

  const contentStyle = {
    padding: '0 1rem',
    maxWidth: '32rem',
    width: '100%',
  };

  const titleStyle = {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const paragraphStyle = {
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    lineHeight: 1.7,
    marginBottom: '1.5rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  const signatureStyle = {
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    textAlign: 'right',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  return (
    <section style={sectionStyle} className="snap-section">
      {/* 背景動画 */}
      <div style={videoContainerStyle}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={videoStyle}
        >
          <source src="/videos/greeting.mp4" type="video/mp4" />
        </video>
        
        {/* オーバーレイ */}
        <div style={overlayStyle}></div>
      </div>
      
      {/* テキストコンテンツ */}
      <div style={contentContainerStyle}>
        <div style={contentStyle}>
          <motion.h2
            style={titleStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            幹部挨拶
          </motion.h2>
          
          <motion.p
            style={paragraphStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            この度は私たちの公演「UTOPIA」にお越しいただき、誠にありがとうございます。
            本公演では、様々なジャンルのダンスを通して、理想郷（ユートピア）というテーマを
            表現していきます。日常から離れ、ひと時の夢のような空間をお楽しみください。
          </motion.p>
          
          <motion.p
            style={signatureStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            代表 ○○○○
          </motion.p>
        </div>
      </div>
    </section>
  );
}