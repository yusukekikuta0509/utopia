'use client';

import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function ExecutiveGreeting() {
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

  return (
    <section id="greeting" ref={sectionRef} style={sectionStyle} className="snap-section">
      <div style={videoContainerStyle}>
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          style={videoStyle}
        >
          <source src="/videos/greeting.mp4" type="video/mp4" />
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
        </div>
      </div>
    </section>
  );
}
