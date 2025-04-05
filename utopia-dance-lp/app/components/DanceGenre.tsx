'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export interface DanceGenreProps {
  id: string;
  name: string;
  choreographer: string;
  performers: string[];
}

// performers を chunkSize ごとに分割して配列の配列にする関数
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

/**
 * 表示用の名前（例："R&B"）を安全なファイル名に変換する関数
 * 例: "r&b" -> "r-and-b"
 */
function getSafeFileName(name: string): string {
  const lowerName = name.toLowerCase();
  const safeFileNameMap: Record<string, string> = {
    "r&b": "r-and-b",
    // 他の特殊な名前があればここに追加可能
  };
  return safeFileNameMap[lowerName] || encodeURIComponent(lowerName);
}

// 動画ファイルのパスを生成するヘルパー関数
function getEncodedVideoPath(name: string, suffix: string = '', ext: string = 'mp4'): string {
  const fileName = getSafeFileName(name);
  return `/videos/${fileName}${suffix ? '-' + suffix : ''}.${ext}`;
}

// 画像ファイルのパスを生成するヘルパー関数
function getEncodedImagePath(name: string, ext: string = 'JPG'): string {
  const fileName = getSafeFileName(name);
  return `/images/${fileName}.${ext}`;
}

const DanceGenre: React.FC<DanceGenreProps> = ({
  id,
  name,
  choreographer,
  performers = [],
}) => {
  // 表示用の名前はそのまま利用（"R&B" はそのまま出力される）
  const safeName = name || 'default';
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // 出演者を行ごとに分割（例：1行あたり 6 人）
  const chunkedPerformers = chunkArray(performers, 6);

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [loaded]);

  // 各種スタイル
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
    gap: '0.75rem',
    maxWidth: '90%',
    margin: '0 auto',
  };

  const titleStyle: CSSProperties = {
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    fontWeight: 'normal',
    letterSpacing: '0.2em',
    marginBottom: '0.5rem',
    textShadow:
      '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)',
    color: '#ffffff',
    textTransform: 'uppercase',
  };

  const choreographerStyle: CSSProperties = {
    fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
  };

  const performersContainerStyle: CSSProperties = {
    marginTop: '0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: '0.5rem 0.75rem',
    borderRadius: '4px',
  };

  const performersLabelStyle: CSSProperties = {
    fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
    marginBottom: '0.4rem',
    fontWeight: 'bold',
    textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
    letterSpacing: '0.05em',
    opacity: 0.9,
  };

  const performersLineStyle: CSSProperties = {
    fontSize: 'clamp(0.6rem, 1.8vw, 0.8rem)',
    marginBottom: '0.15rem',
    lineHeight: '1.2',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
    fontWeight: 'normal',
    opacity: 0.8,
    letterSpacing: '0.02em',
  };

  return (
    <section id={id} ref={sectionRef} className={quicksand.className} style={sectionStyle}>
      {/* 上半分：画像 */}
      <div style={topHalfStyle}>
        <div style={imageContainerStyle}>
          <Image
            src={getEncodedImagePath(safeName)}
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
            {/* 常に -mobile 動画を使用 */}
            <source
              src={getEncodedVideoPath(safeName, 'mobile')}
              type="video/mp4"
            />
            <source
              src={getEncodedVideoPath(safeName, 'mobile', 'webm')}
              type="video/webm"
            />
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
          <motion.h2
            style={titleStyle}
            animate={{
              textShadow: [
                '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)',
                '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.7)',
                '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)',
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {safeName}
          </motion.h2>

          <p style={choreographerStyle}>Choreographer<br />{choreographer}</p>

          {/* 出演者セクション */}
          <div style={performersContainerStyle}>
            <p style={performersLabelStyle}>Dancer</p>
            {chunkedPerformers.map((line, idx) => (
              <p key={idx} style={performersLineStyle}>
                {line.join('・')}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DanceGenre;
