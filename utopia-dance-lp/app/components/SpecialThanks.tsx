'use client';
import { motion } from 'framer-motion';
import React, { CSSProperties, useEffect, useState, useRef } from 'react';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function SpecialThanks() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
              if (!loaded) setLoaded(true);
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [loaded]);

  const sectionStyle: CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    overflow: 'hidden',
  };

  const videoContainerStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  };

  const videoStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.6,
  };

  const overlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  };

  const contentContainerStyle: CSSProperties = {
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

  const contentStyle: CSSProperties = {
    textAlign: 'center',
    padding: '0 1rem',
    maxWidth: '32rem',
    width: '100%',
  };

  const titleStyle: CSSProperties = {
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    fontWeight: 'normal',
    letterSpacing: '0.2em',
    marginBottom: '1.5rem',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const paragraphStyle: CSSProperties = {
    fontSize: 'clamp(0.65rem, 1.5vw, 1rem)',
    marginBottom: '1.5rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
    lineHeight: '1.6',
  };

  const listContainerStyle: CSSProperties = {
    marginTop: '1.5rem',
  };

  const listItemStyle: CSSProperties = {
    fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
    marginBottom: '0.5rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  return (
    // クラス名を追加して、全体に Quicksand フォントを適用
    <section id="special-thanks" ref={sectionRef} className={quicksand.className} style={sectionStyle}>
      {/* 背景動画 */}
      <div style={videoContainerStyle}>
        <video ref={videoRef} loop muted playsInline style={videoStyle}>
          <source src="videos/water-mobile.mp4" type="video/mp4" />
        </video>
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
            SPECIAL THANKS
          </motion.h2>
          
          <motion.p
            style={paragraphStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            本公演の開催にあたり、多くの方々にご支援いただきました。
            <br />
            心より感謝申し上げます。
          </motion.p>
          
          <motion.div
            style={listContainerStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: '80%' }}>
              <p style={listItemStyle}>公演制作:<br /><br />Rootz株式会社様</p><br />
              <p style={listItemStyle}>映像制作:<br /><br />佐久間 晴士様</p><br />
              <p style={listItemStyle}>撮影協力:<br /><br />小島 慎ノ介様</p><br />
              <p style={listItemStyle}>Web制作 技術協力:<br /><br />Yusuke Kikuta</p><br />
              <p style={listItemStyle}>
                撮影協力:<br /><br />目白Gallery-O5 Le Royal<br />Gallery-O17 Mademoiselle<br />Studio CYBER GIGS<br />Spacemarket、Bar anda
              </p>
              <p style={listItemStyle}><br />ご来場いただいた皆様</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
