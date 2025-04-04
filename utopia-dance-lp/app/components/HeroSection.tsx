'use client';
import { motion } from 'framer-motion';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function HeroSection() {
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
    // next/font で読み込んだフォントを適用
    fontFamily: quicksand.style.fontFamily,
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
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontWeight: 'normal',
    letterSpacing: '0.2em',
    marginBottom: '1.5rem',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
  };

  const subtitleStyle: CSSProperties = {
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    marginBottom: '1.5rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  const infoStyle: CSSProperties = {
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    marginTop: '1.5rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  return (
    <section ref={sectionRef} style={sectionStyle}>
      <div style={videoContainerStyle}>
        <video ref={videoRef} loop muted playsInline style={videoStyle}>
          <source src="videos/water-mobile.mp4" type="video/mp4" />
        </video>
        <div style={overlayStyle}></div>
      </div>
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
