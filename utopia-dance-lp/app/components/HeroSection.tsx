'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroSection() {
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
    textAlign: 'center',
    padding: '0 1rem',
    maxWidth: '32rem',
    width: '100%',
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontWeight: 'bold',
    letterSpacing: '0.2em',
    marginBottom: '1.5rem',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
  };

  const subtitleStyle = {
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    marginBottom: '1.5rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  const infoStyle = {
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    marginTop: '1.5rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  return (
    <section style={sectionStyle}>
      {/* 背景動画 */}
      <div style={videoContainerStyle}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={videoStyle}
        >
          <source src="/videos/water.mp4" type="video/mp4" />
        </video>
        
        {/* オーバーレイ */}
        <div style={overlayStyle}></div>
      </div>
      
      {/* テキストコンテンツ */}
      <div style={contentContainerStyle}>
        <div style={contentStyle}>
          <motion.h1
            style={titleStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            UTOPIA
          </motion.h1>
          
          <motion.div
            style={subtitleStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p style={{ marginBottom: '0.25rem' }}>aka Wa.Se.Da.</p>
            <p style={{ marginBottom: '0.25rem' }}>4/26</p>
            <p>16th春公演</p>
          </motion.div>
          
          <motion.div
            style={infoStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
             <p style={{ marginBottom: '0.25rem' }}>昼公演</p>
            <p style={{ marginBottom: '0.25rem' }}>open : 12:30</p>
            <p>start : 13:00</p>
          </motion.div>
          <motion.div
            style={infoStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
             <p style={{ marginBottom: '0.25rem' }}>夜公演</p>
            <p style={{ marginBottom: '0.25rem' }}>open : 16:00</p>
            <p>start : 16:30</p>
            </motion.div>
        </div>
      </div>
    </section>
  );
}