// components/LoadingScreen.tsx
import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // リソースのロード状況を追跡するための変数
    let loading = true;
    let progressValue = 0;
    
    // ロード進捗をシミュレートする
    const interval = setInterval(() => {
      if (!loading) return;
      
      // 進捗を段階的に増加させる
      progressValue += Math.random() * 3 + 1;
      
      // ウィンドウのロード状態をチェック
      if (document.readyState === 'complete') {
        // ページが完全に読み込まれた場合は、進捗を100%に向けて加速
        progressValue = Math.min(progressValue + 10, 99);
        
        // 少し待ってから100%にして完了
        if (progressValue >= 99) {
          progressValue = 100;
          loading = false;
          clearInterval(interval);
          
          // 完了後に少し待ってからコールバックを実行
          setTimeout(() => {
            onLoadComplete();
          }, 500);
        }
      }
      
      setProgress(Math.min(progressValue, 100));
    }, 100);

    // コンポーネントのアンマウント時にインターバルをクリア
    return () => {
      loading = false;
      clearInterval(interval);
    };
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