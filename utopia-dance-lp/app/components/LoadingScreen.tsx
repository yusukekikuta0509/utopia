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

      // welcomeメッセージ表示後、表示時間を延長したい場合は下記の遅延時間を変更する
      setTimeout(() => {
        // ここに次の処理（例: ルーター遷移など）を記述
        // 例: router.push('/hero');
      }, 5000); // 3000ms から 5000ms に変更
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

  const logoStyle: CSSProperties = {
    marginBottom: '3rem',
    letterSpacing: '0.2em',
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    opacity: 0.8,
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
    </motion.div>
  );
}
