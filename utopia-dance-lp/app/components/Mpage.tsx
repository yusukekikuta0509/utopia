'use client';
import { motion } from 'framer-motion';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Quicksand } from 'next/font/google';
import Image from 'next/image';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function PerformanceOrderSection() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true);
            // Play video when section is in view
            if (videoRef.current) {
              videoRef.current.play().catch(error => {
                console.error("Video playback failed:", error);
              });
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

  const performances = [
    { id: 'M1', name: 'OP', href: '#m1' },
    { id: 'M2', name: 'NEW', href: '#m2' },
    { id: 'M3', name: 'MIDDLE', href: '#m3' },
    { id: 'M4', name: 'GIRLS', href: '#m4' },
    { id: 'M5', name: 'STYLE', href: '#m5' },
    { id: 'M6', name: 'R&B', href: '#m6' },
    { id: 'M7', name: 'JAZZ', href: '#m7' },
    { id: 'M8', name: 'WAACK', href: '#m8' },
    { id: 'M9', name: 'HOUSE', href: '#m9' },
    { id: 'M10', name: 'POP', href: '#m10' },
    { id: 'M11', name: 'BREAK', href: '#m11' },
    { id: 'M12', name: 'LOCK', href: '#m12' },
  ];

  const sectionStyle: CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    overflow: 'hidden',
    fontFamily: quicksand.style.fontFamily,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const videoContainerStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
  };

  const videoStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const backgroundStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))',
    zIndex: 1,
  };

  const contentContainerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '800px',
    padding: '2rem',
    zIndex: 2,
    textAlign: 'center',
  };

  const titleStyle: CSSProperties = {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '300',
    letterSpacing: '0.2em',
    marginBottom: '3rem',
    textTransform: 'uppercase',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
    color: '#fff',
  };

  const performanceListStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    width: '100%',
  };

  const performanceItemStyle: CSSProperties = {
    position: 'relative',
    textAlign: 'center',
    padding: '0',
    borderRadius: '4px',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    textDecoration: 'none',
  };

  const imageContainerStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  };

  const contentStyle: CSSProperties = {
    position: 'relative',
    zIndex: 1,
    padding: '1rem',
    width: '100%',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '1rem',
  };

  const idStyle: CSSProperties = {
    fontSize: '0.875rem',
    marginBottom: '0.25rem',
    letterSpacing: '0.1em',
    color: '#fff',
    fontWeight: '400',
  };

  const nameStyle: CSSProperties = {
    fontSize: '1.25rem',
    letterSpacing: '0.15em',
    fontWeight: '300',
    color: '#fff',
  };

  const getSafeName = (name: string) => {
    // Remove special characters like & for file names
    return name.replace(/&/g, 'and');
  };

  return (
    <section ref={sectionRef} style={sectionStyle}>
      <div style={videoContainerStyle}>
        <video ref={videoRef} loop muted playsInline style={videoStyle}>
          <source src="videos/water-mobile.mp4" type="video/mp4" />
        </video>
      </div>
      <div style={backgroundStyle}></div>
      <div style={contentContainerStyle}>
        <motion.h2
          style={titleStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          PERFORMANCE ORDER
        </motion.h2>
        <motion.div
          style={performanceListStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {performances.map((performance, index) => {
            const safeName = getSafeName(performance.name);
            return (
              <motion.a
                key={performance.id}
                href={performance.href}
                style={performanceItemStyle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
                whileHover={{
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                }}
              >
                <div style={imageContainerStyle}>
                  <Image
                    src={`/images/${safeName.toLowerCase()}.JPG`}
                    alt={`${safeName} dance`}
                    fill
                    style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
                    priority
                  />
                </div>
                <div style={contentStyle}>
                  <h3 style={idStyle}>
                    {performance.id}
                  </h3>
                  <p style={nameStyle}>
                    {performance.name}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}