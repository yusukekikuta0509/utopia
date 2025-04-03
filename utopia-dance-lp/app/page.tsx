'use client';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ExecutiveGreeting from '@/components/ExecutiveGreeting';
import LogoDesign from '@/components/LogoDesign';
import DanceGenres, { DanceGenreProps } from '@/components/DanceGenres';
import SpecialThanks from '@/components/SpecialThanks';
import MemberList from '@/components/MemberList';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if this is first load using sessionStorage
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited === 'true') {
      // If user has already visited, skip loading screen
      setIsLoading(false);
    } else {
      // Set flag for future visits
      sessionStorage.setItem('hasVisited', 'true');
      
      // Simulate loading time or wait for content to be ready
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Adjust timing as needed
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Function to manually complete loading (can be called from LoadingScreen)
  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const genres: DanceGenreProps[] = [
    {
      id: 'M1',
      name: 'BREAK',
      choreographer: '髙崎千春　山脇蒼翔　吉田実桜',
      performers: [
        '宮川梨沙',
        '菅野達也',
        '松田凌',
        '吉田実桜',
        '山脇蒼翔',
        '岩脇朱音',
        '荒木朱華',
        '橋本菜優',
        '成田優奈',
        '竹内鈴音',
        '源健太郎',
        '髙﨑千春',
        '松瀬愛佳',
        '吉田玲',
        '伊藤翼',
        '池田理玖',
        '高島里菜',
        '重元美佑',
        '林紗和',
        '佐藤紗花',
        '金城嘉一',
        '池内優太',
        '江川創',
        '大北壮太',
        '横田実柚',
        '竹本楓',
        '成松もも',
        '高橋春来',
        '尾崎彩香',
        '井本真城',
        '山田莉奈'
      ]
    },
    // 他のジャンルはスペースの都合上省略
    // ...
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* ローディング画面 - isLoadingがtrueの間だけ表示 */}
      {isLoading ? (
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      ) : (
        /* メインコンテンツ - isLoadingがfalseになったら表示 */
        <>
          <Navbar />
          <main className="flex-grow">
            <HeroSection />
            <ExecutiveGreeting />
            <LogoDesign />
            <DanceGenres genres={genres} />
            <SpecialThanks />
            <MemberList />
          </main>
        </>
      )}
    </div>
  );
}