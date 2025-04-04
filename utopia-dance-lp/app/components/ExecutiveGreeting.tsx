'use client';

import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function ExecutiveGreeting() {
  const [loaded, setLoaded] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
              // 最初にビューポートに入ったときのみテキストをフェードイン
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

  // インラインスタイル定義
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
    padding: '0 1rem',
    maxWidth: '32rem',
    width: '100%',
  };

  const titleStyle: CSSProperties = {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const paragraphStyle: CSSProperties = {
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    lineHeight: 1.7,
    marginBottom: '1.5rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  const signatureStyle: CSSProperties = {
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    textAlign: 'right',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  // 改良されたアンケートボタンスタイル
  const surveyButtonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    margin: '2.5rem auto 0',
    padding: '0.85rem 1.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '8px',
    fontSize: 'clamp(0.85rem, 1.7vw, 1rem)',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  };

  const buttonHighlightStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%)',
    backgroundSize: '200% 200%',
    animation: 'shimmer 3s infinite',
    zIndex: -1,
  };

  // モーダル全体のコンテナスタイル - 改良
  const surveyModalContainerStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
    display: showSurvey ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(12px)',
    padding: '20px',
  };

  // モーダル本体のスタイル - 改良
  const surveyModalStyle: CSSProperties = {
    width: '90%',
    maxWidth: '800px',
    height: 'auto',
    maxHeight: '85vh',
    backgroundColor: 'rgba(18, 18, 18, 0.95)',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  };

  // モーダルヘッダーのスタイル - 改良
  const surveyHeaderStyle: CSSProperties = {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  };

  // モーダルタイトルのスタイル - 改良
  const surveyTitleStyle: CSSProperties = {
    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '0.5px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  // クローズボタンのスタイル - 改良
  const closeButtonStyle: CSSProperties = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  // フォーム表示エリアのスタイル - 改良
  const surveyContentStyle: CSSProperties = {
    padding: '0',
    overflow: 'hidden',
    position: 'relative',
    flexGrow: 1,
    height: 'calc(85vh - 84px)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  };

  // iframeスタイルの改良
  const iframeStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
    background: '#fff',
    borderRadius: '0 0 12px 12px',
  };

  // モーダルのロード状態を管理
  const [iframeLoading, setIframeLoading] = useState(true);

  // ローディングインジケーターのスタイル
  const loadingOverlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: iframeLoading ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    color: '#fff',
    zIndex: 5,
    borderRadius: '0 0 12px 12px',
  };

  // アイコン用のスタイル
  const iconStyle: CSSProperties = {
    marginRight: '8px',
    opacity: 0.8,
  };

  // パルスアニメーション用のキーフレーム
  const pulseKeyframes = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;

  return (
    <section id="greeting" ref={sectionRef} style={sectionStyle} className="snap-section">
      <style>{pulseKeyframes}</style>
      <div style={videoContainerStyle}>
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          style={videoStyle}
        >
          <source src="/videos/Greeting-mobile.mp4" type="video/mp4" />
        </video>
        <div style={overlayStyle}></div>
      </div>
      
      <div style={contentContainerStyle}>
        <div style={contentStyle}>
          <motion.h2
            style={titleStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            幹部挨拶
          </motion.h2>
          
          <motion.p
            style={paragraphStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            この度はaka Wa.Se.Da. 16代目春公演『Utopia』にお越しいただき誠にありがとうございます。
            本公演のタイトルである『Utopia』は『理想郷』という意味で、理想的な世界を意味します。
            本公演の演目一つ一つが私たちの『理想』の作品であり、本公演が『理想郷』のような公演であることを表現しています。
            そして、ダンスを通じて素敵なサークル員が集うaka Wa.Se.Da. が『理想郷』であり、これから新入生を含めて3代で新たな理想郷を作っていきたい、という願いも込めています。
            16代・17代で作る初めての作品です。ご来場される皆様に楽しんで頂けるよう、サークル員一丸となって練習や準備に励んできました。
            ご来場頂いた全ての皆様に公演を楽しんで頂けたら幸いです。<br />『 Utopia』を最後までお楽しみください。
          </motion.p>
          
          <motion.p
            style={signatureStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            代表　松川華菜
            <br />副代表　田口玲　水野天翔　宮川梨沙
            <br />会計　藤田葉月
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            style={{ textAlign: 'center' }}
          >
            <motion.button 
              style={surveyButtonStyle} 
              onClick={() => setShowSurvey(true)}
              whileHover={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                borderColor: 'rgba(255, 255, 255, 0.6)',
                scale: 1.03
              }}
              animate={{ 
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div style={buttonHighlightStyle}></div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              アンケートにご協力ください
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* 改良版アンケートモーダル */}
      <motion.div 
        style={surveyModalContainerStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: showSurvey ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => {
          // モーダル背景をクリックした時に閉じる
          if (e.target === e.currentTarget) {
            setShowSurvey(false);
          }
        }}
      >
        <motion.div 
          style={surveyModalStyle}
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: showSurvey ? 1 : 0.9, y: showSurvey ? 0 : 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div style={surveyHeaderStyle}>
            <h3 style={surveyTitleStyle}>
              <svg style={iconStyle} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              公演アンケート
            </h3>
            <button 
              style={closeButtonStyle} 
              onClick={() => setShowSurvey(false)}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              ×
            </button>
          </div>
          <div style={surveyContentStyle}>
            <div style={loadingOverlayStyle}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '10px' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1.5s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
                <div>アンケート読み込み中...</div>
              </div>
            </div>
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSf9wVc4q7boBjrbfDVzXPlCUjbb7qtZKazOndZj2uZhec1_Ew/viewform?embedded=true" 
              style={iframeStyle}
              title="アンケートフォーム"
              onLoad={() => setIframeLoading(false)}
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}