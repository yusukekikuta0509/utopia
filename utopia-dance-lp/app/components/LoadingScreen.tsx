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
      setTimeout(() => {
        setLoading(false);
        setShowWelcome(true);
      }, 500);
      setTimeout(() => {
        // 例: router.push('/hero');
      }, 5000);
    }
  }, [progress, router]);

  // 画面全体の背景コンテナ（常に表示）
  const containerStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: quicksand.style.fontFamily,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  };

  // 中央配置用ラッパー：固定高さで状態切替時も縦位置を保持
  const centerContentStyle: CSSProperties = {
    height: '250px', // 固定高さ（必要に応じて調整）
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // ロード中のみ表示（プログレスバー上部に配置）
  const logoStyle: CSSProperties = {
    marginBottom: '1.5rem', // プログレスバーとの隙間調整
    letterSpacing: '0.2em',
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    opacity: 0.8,
    textAlign: 'center',
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
    textAlign: 'center',
  };

  // welcome メッセージ：スマホでも1行に収まるよう調整
  const welcomeTextStyle: CSSProperties = {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)', // お好みで数値調整
  fontWeight: 'normal',
  letterSpacing: '0.3em',
  textAlign: 'center',
  textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
  margin: '0 auto',       // 中央寄せのため自動マージンを追加
  whiteSpace: 'nowrap',

  };

  // footer を画面全体に固定して表示
  const footerTextStyle: CSSProperties = {
    position: 'fixed',
    bottom: '5%', // 画面下部5%の位置に配置
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.6rem',
    textAlign: 'center',
    color: '#fff',
    opacity: 0.8,
    letterSpacing: '0.1em',
    zIndex: 10000,
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={centerContentStyle}>
          {loading ? (
            <>
              <div style={logoStyle}>aka Wa.Se.Da</div>
              <div style={progressContainerStyle}>
                <div style={progressBarStyle}></div>
              </div>
              <div style={progressTextStyle}>{Math.round(progress)}%</div>
            </>
          ) : showWelcome ? (
            <motion.div
              style={welcomeTextStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Enter the World of UTOPIA
            </motion.div>
          ) : null}
        </div>
      </div>
      <div style={footerTextStyle}>
        ※動画ファイルを多く使用しているため、<br />通信環境の良い場所でご覧ください。
      </div>
    </>
  );
}