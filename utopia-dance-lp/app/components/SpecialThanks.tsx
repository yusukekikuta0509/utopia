'use client';

import { motion } from 'framer-motion';
import React, { CSSProperties, useEffect, useState } from 'react';

export default function SpecialThanks() {
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
  } as CSSProperties;

  const videoContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  } as CSSProperties;

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.6,
  } as CSSProperties;

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  } as CSSProperties;

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
  } as CSSProperties;

  const contentStyle = {
    textAlign: 'center',
    padding: '0 1rem',
    maxWidth: '32rem',
    width: '100%',
  } as CSSProperties;

  const titleStyle = {
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    fontWeight: 'bold',
    letterSpacing: '0.2em',
    marginBottom: '1.5rem',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  } as CSSProperties;

  const paragraphStyle = {
    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
    marginBottom: '1.5rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
    lineHeight: '1.6',
  } as CSSProperties;

  const listContainerStyle = {
    marginTop: '1.5rem',
  } as CSSProperties;

  const listItemStyle = {
    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
    marginBottom: '0.5rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  } as CSSProperties;

  return (
    <section id="special-thanks" style={sectionStyle}>
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
          <motion.h2
            style={titleStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            Special Thanks
          </motion.h2>
          
          <motion.p
            style={paragraphStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            本公演の開催にあたり、多くの方々にご支援いただきました。心より感謝申し上げます。
          </motion.p>
          
          <motion.div
            style={listContainerStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div style={{textAlign: 'left', margin: '0 auto', maxWidth: '80%'}}>
              <p style={listItemStyle}>○○○様 - 会場提供</p>
              <p style={listItemStyle}>○○○様 - 機材協力</p>
              <p style={listItemStyle}>○○○様 - 衣装提供</p>
              <p style={listItemStyle}>○○○サークル - 技術協力</p>
              <p style={listItemStyle}>ご来場いただいた皆様</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}