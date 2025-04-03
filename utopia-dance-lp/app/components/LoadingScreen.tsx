// components/LoadingScreen.tsx
import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // ロード進捗をシミュレートする
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // 100%に達したらコールバックを実行
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadComplete();
          }, 500); // 完了後0.5秒待ってから表示切替
          return 100;
        }
        // 進捗をランダムに増加（より自然に見せるため）
        return Math.min(prevProgress + Math.random() * 5 + 2, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="relative w-64 mb-12">
        <div className="text-white text-6xl font-bold mb-4 tracking-tighter">LOUNGE</div>
        <div className="absolute -top-2 -right-2 text-white text-xs">DANCE</div>
      </div>
      
      {/* 進捗バー */}
      <div className="w-64 h-[1px] bg-gray-800 mb-4 relative">
        <div 
          className="h-full bg-white absolute top-0 left-0 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* 進捗パーセンテージ */}
      <div className="text-white font-mono text-sm tracking-widest">
        {Math.floor(progress)}%
      </div>
    </div>
  );
};

export default LoadingScreen;