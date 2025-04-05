'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function LogoDesign() {
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
              setLoaded(true);
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
  }, []);

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
    filter: 'grayscale(100%)',
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

  const whiteOverlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 2.5,
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
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontWeight: 'normal',
    letterSpacing: '0.2em',
    marginBottom: '1.5rem',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
    color: '#ffffff',
  };

  const paragraphStyle: CSSProperties = {
    fontSize: 'clamp(0.68rem, 2vw, 1.125rem)',
    lineHeight: '1.6',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  return (
    <section id="logo" ref={sectionRef} className={quicksand.className} style={sectionStyle}>
      {/* 背景動画 */}
      <div style={videoContainerStyle}>
        <video ref={videoRef} loop muted playsInline style={videoStyle}>
          <source src="/videos/logo_mobile.mp4" type="video/mp4" />
        </video>
        <div style={overlayStyle}></div>
        <div style={whiteOverlayStyle}></div>
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
              src="/images/logo.PNG"
              alt="UTOPIA Logo Design"
              width={300}
              height={380}
              style={{ display: 'block', margin: '0 auto', filter: 'grayscale(100%)' }}
            />
          </div>
          <motion.p
            style={paragraphStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            UTOPIAのロゴは『理想郷』という意味合いから着想を得ています。<br />期待と夢を風船のような文字に込め、<br />モノクロの世界観で鮮明さと幻想性の両立を目指しました。
            <br /><br />本公演が観客の皆様にとって、<br />またサークル員一同の『理想郷』となりますよう<br />願いを込めて。
          </motion.p>
        </div>
      </div>
    </section>
  );
}
