'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function LogoDesign() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  // セクション全体のスタイル
  const sectionStyle = {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    overflow: 'hidden',
  };

  // 背景動画コンテナのスタイル
  const videoContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  };

  // 背景動画のスタイル
  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.6,
  };

  // オーバーレイのスタイル（ぼかしなし）
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  };

  // 中央コンテンツ配置用コンテナのスタイル
  const contentContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  };

  // コンテンツ全体のスタイル
  const contentStyle = {
    textAlign: 'center',
    padding: '0 1rem',
    maxWidth: '32rem',
    width: '100%',
  };

  // タイトルのスタイル（UTOPIA のヒーローセクションに倣う）
  const titleStyle = {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontWeight: 'bold',
    letterSpacing: '0.2em',
    marginBottom: '1.5rem',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
  };

  // サブタイトルのスタイル
  const subtitleStyle = {
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    marginBottom: '1rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  // 説明文のスタイル
  const paragraphStyle = {
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    lineHeight: '1.6',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  return (
    <section id="logo" style={sectionStyle}>
      {/* 背景動画 */}
      <div style={videoContainerStyle}>
        <video autoPlay loop muted playsInline style={videoStyle}>
          <source src='/videos/water.mp4' type='video/mp4' />
        </video>
        <div style={overlayStyle}></div>
      </div>
      
      {/* 中央コンテンツ */}
      <div style={contentContainerStyle}>
        <div style={contentStyle}>
          <motion.h1
            style={titleStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            LOGO DESIGN
          </motion.h1>
          <div style={{ margin: '1rem 0' }}>
            <Image
              src='/images/logo.PNG'
              alt='UTOPIA Logo Design'
              width={300}
              height={300}
              style={{ display: 'block', margin: '0 auto', filter: 'grayscale(100%)' }}
            />
          </div>
          <motion.p
            style={paragraphStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            UTOPIAのロゴデザインは、水面の揺らぎから着想を得ています。理想と現実の境界線が曖昧に揺れ動く様子を表現し、モノクロの世界観で鮮明さと幻想性を両立させています。
          </motion.p>
        </div>
      </div>
    </section>
  );
}
