'use client';

import Link from 'next/link';
import React, { CSSProperties, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // スクロールで navbar の背景や影を変更
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // メニューオープン時にスクロールを無効化
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // 全画面メニューのアニメーションバリアント
  const menuVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // メニュー項目のアニメーション（スタガー効果）
  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
      },
    }),
  };

  // Navbar のスタイル（半透明背景・ぼかし）
  const navbarStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    boxShadow: scrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'all 0.3s ease-in-out',
  };

  const navContainerStyle: CSSProperties = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const logoStyle: CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.2em',
    color: '#fff',
    textDecoration: 'none',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
    zIndex: 1001,
  };

  // フルスクリーンメニュー（半透明黒背景）
  const fullscreenMenuStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // 中央寄せ + 上下に余白
    justifyContent: 'center',
    paddingTop: '4rem',
    paddingBottom: '4rem',
    overflow: 'auto',
    zIndex: 1000,
  };

  const fullscreenMenuItemStyle: CSSProperties = {
    color: '#fff',
    fontSize: '1.5rem',
    margin: '0.4rem 0',
    textAlign: 'center',
    fontWeight: '500',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    letterSpacing: '0.1em',
    transition: 'color 0.3s, transform 0.3s',
  };

  // 幹部挨拶、ロゴデザイン、SpecialThanks は下線をつける
  const underlinedLinkStyle: CSSProperties = {
    ...fullscreenMenuItemStyle,
    textDecoration: 'underline',
  };

  // 「公演ジャンル」の見出しにも下線を入れる
  const categoryTitleStyle: CSSProperties = {
    color: '#fff',
    fontSize: '1rem',
    marginTop: '2rem',
    marginBottom: '0.5rem',
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: '0.2em',
    opacity: 0.7,
    textTransform: 'uppercase',
    textDecoration: 'underline',
  };

  // ハンバーガーメニューのスタイル（白い三本線アイコンのみ）
  const hamburgerStyle: CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    height: '48px',
    width: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    zIndex: 1001,
  };

  // 公演ジャンル（M順）の項目（各項目を縦に1行ずつ表示）
  const concertGenres = [
    { id: 'M1', name: 'OP', href: '#m1' },
    { id: 'M2', name: 'コレオ', href: '#m2' },
    { id: 'M3', name: 'Style', href: '#m3' },
    { id: 'M4', name: 'Middle', href: '#m4' },
    { id: 'M5', name: 'Girls', href: '#m5' },
    { id: 'M6', name: 'Pop', href: '#m6' },
    { id: 'M7', name: 'R&B', href: '#m7' },
    { id: 'break', name: '休憩', href: '' },
    { id: 'M8', name: 'House', href: '#m8' },
    { id: 'M9', name: 'Waack', href: '#m9' },
    { id: 'M10', name: 'Break', href: '#m10' },
    { id: 'M11', name: 'New', href: '#m11' },
    { id: 'M12', name: 'Jazz', href: '#m12' },
    { id: 'M13', name: 'Lock', href: '#m13' },
    { id: 'M14', name: 'Ending', href: '#m14' },
  ];

  // フルスクリーンメニュー内コンテナのスタイル
  const menuContainerStyle: CSSProperties = {
    width: '100%',
    height: 'auto', // 内容に合わせて高さを可変に
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  };

  // セクション区切りライン
  const dividerStyle: CSSProperties = {
    width: '30px',
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: '1rem 0',
  };

  return (
    <header style={navbarStyle}>
      <div style={navContainerStyle}>
        {/* ロゴ */}
        <Link href="/" style={logoStyle}>
          aka Wa.Se.Da.
        </Link>

        {/* ハンバーガーメニュー（白い三本線アイコンのみ） */}
        <motion.button 
          style={hamburgerStyle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 }
            }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              // X アイコン（白）
              <svg fill="none" stroke="white" viewBox="0 0 24 24" width="32" height="32">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // 白い三本線のアイコン
              <svg fill="none" stroke="white" viewBox="0 0 24 24" width="32" height="32">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* フルスクリーンメニュー */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={fullscreenMenuStyle}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div style={menuContainerStyle}>
              {/* トップセクション */}
              <motion.div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                custom={0}
                variants={itemVariants}
              >
                <Link 
                  href="#greeting" 
                  style={underlinedLinkStyle} 
                  onClick={() => setIsOpen(false)}
                >
                  幹部挨拶
                </Link>
                <Link 
                  href="#logo" 
                  style={underlinedLinkStyle} 
                  onClick={() => setIsOpen(false)}
                >
                  ロゴデザイン
                </Link>
              </motion.div>
              
              <motion.div style={dividerStyle} custom={1} variants={itemVariants}></motion.div>
              
              {/* 公演ジャンル（各項目を縦に並べる） */}
              <motion.div custom={2} variants={itemVariants} style={categoryTitleStyle}>
                公演ジャンル
              </motion.div>
              
              <motion.div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                custom={3}
                variants={itemVariants}
              >
                {concertGenres.map((genre, i) => {
                  if (genre.id === 'break') {
                    // 休憩はリンクでなくテキストのみ
                    return (
                      <div
                        key={genre.id}
                        style={{ ...fullscreenMenuItemStyle, cursor: 'default', fontSize: '1.2rem' }}
                      >
                        {genre.name}
                      </div>
                    );
                  }
                  return (
                    <Link 
                      key={genre.id} 
                      href={genre.href} 
                      style={{
                        ...fullscreenMenuItemStyle,
                        fontSize: '1.2rem',
                        margin: '0.3rem 0',
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {genre.name}
                    </Link>
                  );
                })}
              </motion.div>
              
              <motion.div style={dividerStyle} custom={4} variants={itemVariants}></motion.div>
              
              {/* Special Thanks */}
              <motion.div custom={5} variants={itemVariants}>
                <Link 
                  href="#special-thanks" 
                  style={underlinedLinkStyle} 
                  onClick={() => setIsOpen(false)}
                >
                  Special Thanks
                </Link>
              </motion.div>
              
              <motion.div style={dividerStyle} custom={6} variants={itemVariants}></motion.div>
              
              {/* 各種リンク */}
              <motion.div custom={7} variants={itemVariants} style={{ ...categoryTitleStyle }}>
                各種リンク
              </motion.div>
              
              <motion.div
                style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}
                custom={8}
                variants={itemVariants}
              >
                {/* Twitter */}
                <Link 
                  href="/twitter"
                  style={{ color: '#fff' }}
                  onClick={() => setIsOpen(false)}
                >
                  <svg width="32" height="32" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </Link>
                
                {/* Instagram */}
                <Link 
                  href="/instagram"
                  style={{ color: '#fff' }}
                  onClick={() => setIsOpen(false)}
                >
                  <svg width="32" height="32" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </Link>
                
                {/* YouTube */}
                <Link 
                  href="/youtube" 
                  style={{ color: '#fff' }}
                  onClick={() => setIsOpen(false)}
                >
                  <svg width="32" height="32" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418Z" clipRule="evenodd"></path>
                    <path fillRule="evenodd" d="M15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" fill="black"></path>
                  </svg>
                </Link>
              </motion.div>
              
              {/* コピーライト */}
              <motion.div 
                custom={9} 
                variants={itemVariants} 
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.75rem',
                }}
              >
                © 2025 UTOPIA
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
