'use client';
import { motion } from 'framer-motion';
import React, { CSSProperties, useEffect, useState } from 'react';
import { Quicksand } from 'next/font/google';
import { useRouter } from 'next/navigation';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // ロード進捗のシミュレーション
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // ローディング完了後、welcomeメッセージを表示
      setTimeout(() => {
        setLoading(false);
        setShowWelcome(true);
      }, 500);

      // welcomeメッセージ表示後、表示時間を延長（例：5000ms）
      setTimeout(() => {
        // ここに次の処理（例: ルーター遷移など）を記述
        // 例: router.push('/hero');
      }, 5000);
    }
  }, [progress, router]);

  const containerStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: quicksand.style.fontFamily,
    zIndex: 9999,
  };

  const progressContainerStyle: CSSProperties = {
    width: '60%',
    maxWidth: '500px',
    height: '2px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: '2rem',
    position: 'relative',
    overflow: 'hidden',
  };

  const progressBarStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#fff',
    transition: 'width 0.2s ease-out',
  };

  const progressTextStyle: CSSProperties = {
    fontSize: '1rem',
    letterSpacing: '0.2em',
    marginBottom: '2rem',
    fontWeight: 300,
  };

  const welcomeTextStyle: CSSProperties = {
    fontSize: 'clamp(1.5rem, 5vw, 3rem)',
    fontWeight: 'normal',
    letterSpacing: '0.3em',
    textAlign: 'center',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
  };

  // 既存のロゴ用スタイルはそのまま利用
  const logoStyle: CSSProperties = {
    marginBottom: '3rem',
    letterSpacing: '0.2em',
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    opacity: 0.8,
  };

  // 画面下部に小さく表示するためのフッターテキスト用スタイル
  const footerTextStyle: CSSProperties = {
    position: 'absolute',
    bottom: '15rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.7rem',
    textAlign: 'center',
    color: '#fff',
    opacity: 0.8,
    letterSpacing: '0.1em',
  };

  return (
    <motion.div 
      style={containerStyle}
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: showWelcome ? 0 : 1,
        transition: { 
          duration: 1.5,
          delay: showWelcome ? 1.5 : 0
        }
      }}
    >
      <div style={logoStyle}>aka Wa.Se.Da</div>
      
      {loading ? (
        <>
          <div style={progressContainerStyle}>
            <div style={progressBarStyle}></div>
          </div>
          <div style={progressTextStyle}>{Math.round(progress)}%</div>
        </>
      ) : (
        <motion.div
          style={welcomeTextStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to UTOPIA
        </motion.div>
      )}
      <div style={footerTextStyle}>
        ※動画ファイルを多く使用しているため、<br />通信環境の良い場所でご覧ください。
      </div>
    </motion.div>
  );
}
