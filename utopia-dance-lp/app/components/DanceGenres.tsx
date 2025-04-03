'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';

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
  name,
  choreographer,
  performers = [],
}) => {
  const safeName = name || 'default';
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setLoaded(true);

    // 動画読み込みエラーのチェック
    if (videoRef.current) {
      videoRef.current.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
      });
      videoRef.current.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
      });
    }
  }, []);

  // performers を4人ごとに分割
  const chunkedPerformers = chunkArray(performers, 4);

  // インラインスタイル
  const sectionStyle = {
    position: 'relative' as const,
    width: '100%',
    height: '100vh',
    color: '#fff',
    display: 'flex' as const,
    flexDirection: 'column' as const,
  };

  const topHalfStyle = {
    position: 'relative' as const,
    flex: '1 0 50%',
    width: '100%',
    overflow: 'hidden',
  };

  const bottomHalfStyle = {
    position: 'relative' as const,
    flex: '1 0 50%',
    width: '100%',
    overflow: 'hidden',
  };

  const imageContainerStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  };

  const videoContainerStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  };

  // backdropFilter を削除
  const overlayStyle = {
    position: 'absolute' as const,
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 2,
  };

  const contentContainerStyle = {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  };

  const contentStyle = {
    textAlign: 'center' as const,
    padding: '0 1rem',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '1rem',
  };

  // UTOPIA のヒーローセクションに近いタイトルスタイル
  const titleStyle = {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontWeight: 'bold',
    letterSpacing: '0.2em',
    marginBottom: '1.5rem',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
    color: '#ffffff', // 発色させるための色指定
  };

  const choreographerStyle = {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
  };

  const performersLabelStyle = {
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    marginBottom: '0.5rem',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
  };

  // 1行分のフォントサイズを大きめに
  const performersLineStyle = {
    fontSize: 'clamp(0.9rem, 3vw, 1.25rem)',
    marginBottom: '0.3rem',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
  };

  return (
    <section style={sectionStyle}>
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
            autoPlay
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
            <source src={`/videos/${safeName.toLowerCase()}.mp4`} type='video/mp4' />
            <source src={`/videos/${safeName.toLowerCase()}.webm`} type='video/webm' />
            動画をサポートしていないブラウザです。
          </video>
        </div>
        <div style={overlayStyle}></div>
      </div>

      {/* 画面全体にテキストを中央配置 */}
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
