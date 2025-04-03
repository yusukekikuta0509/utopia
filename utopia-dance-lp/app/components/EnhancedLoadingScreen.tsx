// components/EnhancedLoadingScreen.tsx
import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const EnhancedLoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  
  useEffect(() => {
    // ロゴを表示するアニメーション
    setTimeout(() => {
      setShowLogo(true);
    }, 300);
    
    // ロード進捗をシミュレートする
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // 100%に達したらコールバックを実行
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadComplete();
          }, 800); // 完了後少し待ってから表示切替
          return 100;
        }
        // 進捗をランダムに増加（より自然に見せるため）
        return Math.min(prevProgress + Math.random() * 3 + 1, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* 背景グリッド */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="border border-gray-800"></div>
        ))}
      </div>
      
      {/* ロゴとコンテンツ */}
      <div className={`relative transition-all duration-1000 transform ${showLogo ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-white text-7xl font-bold mb-12 tracking-tighter relative">
          LOUNGE
          <span className="absolute -top-3 -right-3 text-xs font-light tracking-widest">DANCE</span>
        </div>
        
        {/* 進捗バー */}
        <div className="w-64 h-[2px] bg-gray-900 mb-6 relative overflow-hidden">
          <div 
            className="h-full bg-white absolute top-0 left-0 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* 進捗パーセンテージ */}
        <div className="flex items-center justify-between">
          <div className="text-white font-mono text-sm tracking-widest">
            LOADING
          </div>
          <div className="text-white font-mono text-sm tracking-widest">
            {Math.floor(progress)}%
          </div>
        </div>
      </div>
      
      {/* 装飾エレメント */}
      <div className="absolute bottom-8 left-8 text-gray-700 text-xs">
        © {new Date().getFullYear()} LOUNGE DANCE
      </div>
      
      {/* 幾何学的装飾 */}
      <div className="absolute top-0 right-0 w-64 h-64 border-l border-b border-gray-800 opacity-20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-gray-800 opacity-20" />
    </div>
  );
};

export default EnhancedLoadingScreen;