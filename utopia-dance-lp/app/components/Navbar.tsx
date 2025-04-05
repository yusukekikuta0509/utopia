'use client';
import Link from 'next/link';
import React, { CSSProperties, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // スクロールで Navbar の背景や影を変更
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // メニューオープン時にスクロールを制御
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10) * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // 全画面メニューのアニメーションバリアント
  const menuVariants = {
    closed: { opacity: 0, y: '-100%' },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // メニュー項目のアニメーション（スタガー効果）
  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
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
    overflowX: 'auto',
  };

  const logoStyle: CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'normal',
    letterSpacing: '0.2em',
    color: '#fff',
    textDecoration: 'none',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
    zIndex: 1001,
  };

  // フルスクリーンメニュー全体（画面全体を覆い、中央に配置）
  const fullscreenMenuStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 999,
    padding: '2rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // メニュー内コンテナ（中央に配置・縦スクロール可能）
  const menuContainerStyle: CSSProperties = {
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
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
    display: 'block',
  };

  const underlinedLinkStyle: CSSProperties = {
    ...fullscreenMenuItemStyle,
    textDecoration: 'underline',
  };

  const categoryTitleStyle: CSSProperties = {
    color: '#fff',
    fontSize: '1rem',
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: '0.2em',
    opacity: 0.7,
    textTransform: 'uppercase',
    textDecoration: 'underline',
  };

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


  const dividerStyle: CSSProperties = {
    width: '30px',
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: '1rem 0',
  };

  return (
    // ルート要素に生成されたクラス名を追加することで、Navbar 全体に Quicksand フォントを適用
    <header style={navbarStyle} className={quicksand.className}>
      <div style={navContainerStyle}>
        <Link href="/" style={logoStyle}>
          aka Wa.Se.Da.
        </Link>

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
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg fill="none" stroke="white" viewBox="0 0 24 24" width="32" height="32">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      </div>

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
              <motion.div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                custom={0}
                variants={itemVariants}
              >
                <Link 
                  href="#greeting" 
                  style={underlinedLinkStyle} 
                  onClick={() => setIsOpen(false)}
                >
                  MESSAGE
                </Link>
                <Link 
                  href="#logo" 
                  style={underlinedLinkStyle} 
                  onClick={() => setIsOpen(false)}
                >
                  LOGO DESIGN
                </Link>
              </motion.div>

              <motion.div custom={5} variants={itemVariants}>
                <Link 
                  href="#special-thanks" 
                  style={underlinedLinkStyle} 
                  onClick={() => setIsOpen(false)}
                >
                  SPECIAL THANKS
                </Link>
              </motion.div>
              <motion.div custom={5} variants={itemVariants}>
                <Link 
                  href="#member-list" 
                  style={underlinedLinkStyle} 
                  onClick={() => setIsOpen(false)}
                >
                MEMBER LIST
                </Link>
              </motion.div>
              <motion.div style={dividerStyle} custom={6} variants={itemVariants} />

              <motion.div custom={7} variants={itemVariants} style={categoryTitleStyle}>
                公式アカウント
              </motion.div>

              <motion.div
                style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}
                custom={8}
                variants={itemVariants}
              >
                {/* Twitter (X) アイコン */}
                <Link 
                  href="https://x.com/akaWaSeDa2"
                  style={{ color: '#fff' }}
                  onClick={() => setIsOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="32" height="32" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="white"/>
                  </svg>
                </Link>

                {/* Instagram アイコン */}
                <Link 
                  href="https://www.instagram.com/aka_waseda?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  style={{ color: '#fff' }}
                  onClick={() => setIsOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="32" height="32" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                    <path 
                      fillRule="evenodd" 
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.163-.46-.35-1.26-.403-2.43C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.326 2.636c.46-.163 1.26-.35 2.43-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.736 0 8.332.012 7.052.07 5.78.128 4.802.308 4.042.59a6.875 6.875 0 00-2.5 1.634A6.875 6.875 0 00.59 4.042c-.282.76-.462 1.738-.52 3.01C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.272.238 2.25.52 3.01a6.875 6.875 0 001.634 2.5 6.875 6.875 0 002.5 1.634c.76.282 1.738.462 3.01.52 1.28.058 1.684.07 4.948.07s3.668-.012 4.948-.07c1.272-.058 2.25-.238 3.01-.52a6.875 6.875 0 002.5-1.634 6.875 6.875 0 001.634-2.5c.282-.76.462-1.738.52-3.01.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.272-.238-2.25-.52-3.01a6.875 6.875 0 00-1.634-2.5A6.875 6.875 0 0019.958.59c-.76-.282-1.738-.462-3.01-.52C15.668.012 15.264 0 12 0z" 
                      clipRule="evenodd" 
                    />
                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8z" />
                    <circle cx="18.406" cy="5.594" r="1.44" />
                  </svg>
                </Link>

                {/* YouTube アイコン */}
                <Link 
                  href="https://www.youtube.com/@akaWaSeDa2023" 
                  style={{ color: '#fff' }}
                  onClick={() => setIsOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="32" height="32" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                    <path 
                      fillRule="evenodd" 
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418Z" 
                      clipRule="evenodd" 
                    />
                    <path 
                      fillRule="evenodd" 
                      d="M15.194 12 10 15V9l5.194 3Z" 
                      clipRule="evenodd" 
                      fill="black" 
                    />
                  </svg>
                </Link>
              </motion.div>

              <motion.div 
                style={dividerStyle} 
                custom={9} 
                variants={itemVariants}
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
