'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';

export interface DanceGenreProps {
  id: string;
  name: string;
  choreographer: string;
  performers: string[];
}

// 例: performers を chunkSize ごとに分割して配列の配列にする関数
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

const DanceGenre: React.FC<DanceGenreProps> = ({
  id,
  name,
  choreographer,
  performers = [],
}) => {
  const safeName = name || 'default';
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // performers を4人ごとに分割
  const chunkedPerformers = chunkArray(performers, 8);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
              if (!loaded) {
                setLoaded(true);
              }
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 } // セクションの10%が表示されたら発火
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [loaded]);

  // インラインスタイル
  const sectionStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  };

  const topHalfStyle: CSSProperties = {
    position: 'relative',
    flex: '1 0 50%',
    width: '100%',
    overflow: 'hidden',
  };

  const bottomHalfStyle: CSSProperties = {
    position: 'relative',
    flex: '1 0 50%',
    width: '100%',
    overflow: 'hidden',
  };

  const imageContainerStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  };

  const videoContainerStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  };

  // 背景のぼかし削除
  const overlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    zIndex: 10,
  };

  const contentStyle: CSSProperties = {
    textAlign: 'center',
    padding: '0 1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  // タイトルスタイル
  const titleStyle: CSSProperties = {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontWeight: 'bold',
    letterSpacing: '0.2em',
    marginBottom: '1.5rem',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
    color: '#ffffff',
  };

  const choreographerStyle: CSSProperties = {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
  };

  const performersLabelStyle: CSSProperties = {
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    marginBottom: '0.5rem',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
  };

  const performersLineStyle: CSSProperties = {
    fontSize: 'clamp(0.9rem, 3vw, 1rem)',
    marginBottom: '0.3rem',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
  };

  return (
    <section id={id} ref={sectionRef} style={sectionStyle}>
      {/* 上半分：写真 */}
      <div style={topHalfStyle}>
        <div style={imageContainerStyle}>
          <Image
            src={`/images/${safeName.toLowerCase()}.jpg`}
            alt={`${safeName} dance`}
            fill
            style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
            priority
          />
        </div>
        <div style={overlayStyle}></div>
      </div>

      {/* 下半分：動画 */}
      <div style={bottomHalfStyle}>
        <div style={videoContainerStyle}>
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%)',
              display: 'block',
            }}
          >
            <source src={`/videos/${safeName.toLowerCase()}.mp4`} type="video/mp4" />
            <source src={`/videos/${safeName.toLowerCase()}.webm`} type="video/webm" />
            動画をサポートしていないブラウザです。
          </video>
        </div>
        <div style={overlayStyle}></div>
      </div>

      {/* 中央テキスト */}
      <div style={contentContainerStyle}>
        <motion.div
          style={contentStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={titleStyle}>{safeName}</h2>
          <p style={choreographerStyle}>振り師: {choreographer}</p>
          <div>
            <p style={performersLabelStyle}>出演者:</p>
            {chunkedPerformers.map((line, idx) => (
              <p key={idx} style={performersLineStyle}>
                {line.join(', ')}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DanceGenre;
