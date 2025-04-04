'use client';
import { motion } from 'framer-motion';
import React, { CSSProperties, useEffect, useState, useRef } from 'react';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function MemberList() {
  const [loaded, setLoaded] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [activeGeneration, setActiveGeneration] = useState('16th');

  // メンバー名簿のデータ（代別）
  const members = {
    '16th': [
      "宮川梨沙", "菅野達也", "松田凌", "丹羽香文", "吉田実桜", "田口玲", "村松稜太", "福居莉音", "三浦菜夢", "森佳乃", 
      "土田紗弥", "鈴木ゆら", "岡安理乃", "奥村咲那", "山脇蒼翔", "岩脇朱音", "西村真美", "石森陽向", "日髙悠那", 
      "荒木朱華", "橋本菜優", "水野天翔", "松田祐梨子", "成田優奈", "川井満姫", "廣瀬愛莉", "竹内鈴音", "松川華菜", 
      "藤巻咲都", "實籾映美", "小西菜緒", "源健太郎", "髙﨑千春", "奥田舞", "山形千尋", "松島凛苑", "柳本梨花", 
      "小野寺若奈", "川又祐美", "野崎真由季", "石井彩花", "渡邊彩乃", "藤田葉月", "鍋山陽郁", "久保直輝", "宮本里桜", 
      "古川愛奈", "長倉璃歩", "寺本さやか", "草薙亜未", "松瀬愛佳", "益子穂花", "溝畑希美", "山本桜愛", "長屋咲希", 
      "原田結衣", "松澤南実", "森岡美帆", "菅野詩子", "齋藤小夏", "髙屋敷奈央", "落合妃菜", "鈴木ひなの", "川上椎菜", 
      "川村真帆", "吉田玲", "勝山みつき", "松村怜実", "佐藤まゆな", "松本乃々華", "伊藤翼", "藤本紗季", "深野真人", 
      "横山理緒", "渡邊宏樹", "福田玲奈", "長江柚寿"
    ],
    '17th': [
      "池田理玖", "伊藤咲和", "高島里菜", "都甲智鶴", "染谷菜々美", "畑井春希", "重元美佑", "田部井結愛", "湯本晃大", 
      "林紗和", "窪田真歩", "須貝光", "佐藤紗花", "下阪莉央", "山本茉依", "青山美樹", "藤本杏里紗", "畠山美咲", 
      "堀真琴", "露口京花", "當麻沙来", "井上萄子", "荻沼夏希", "笹川祐加", "上吉原百花", "渡邉一颯", "小宮音羽", 
      "小畑優花", "本田美風", "河原杏奈", "蛎崎航平", "金城嘉一", "泉澤亮哉", "大野丈達", "池内優太", "萩原愛夏", 
      "江川創", "小澤さら", "伊藤遙", "加藤基公", "宮地温子", "西田悠叶", "相佐恵里佳", "中野真緒", "野間菜来", 
      "髙木麻衣", "大北壮太", "八田麻音", "横田実柚", "吉田詩", "竹本楓", "成松もも", "伊丹杏香音", "古川ひなた", 
      "速川恵", "中浜瑛理香", "鳥見珠里", "藤田六花", "龍いろは", "鈴木真子", "髙野萌香", "永田夏海", "栗原莉乃", 
      "勝又綾太郎", "鈴木麻友", "中本みのり", "萩原和子", "髙木彩生", "乙田琉花", "高橋春来", "今野あかり", "松永いぶき", 
      "織田麗奈", "髙岡千夏", "稲見柚奈", "吉岡莉雪", "小林由季", "松浦英麻", "上原真菜", "成澤未蘭", "西村そら", 
      "西野友那", "浅野夏帆", "浅野友彩", "大島瑠琉", "伊澤哲世", "桑澤昴", "後藤里佳子", "青山慶啓", "朴英娜", 
      "中田妃莉南", "黒沢珠莉", "堀田菜月", "橋本大河", "原口紫帆", "大島陽菜", "豊田夏菜", "傳馬奈央", "小川紗利奈", 
      "西谷黎", "尾崎彩香", "井本真城", "山田莉奈", "磯﨑佳乃", "高橋愛李", "田中凛奈", "村野麒咲", "木谷理心"
    ]
  };

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
              if (!loaded) setLoaded(true);
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [loaded]);

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
    textAlign: 'center',
    padding: '0 1rem',
    maxWidth: showMembers ? '80%' : '32rem',
    width: '100%',
    transition: 'max-width 0.5s ease',
  };

  const titleStyle: CSSProperties = {
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    fontWeight: 'normal',
    letterSpacing: '0.2em',
    marginBottom: '1.5rem',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const buttonStyle: CSSProperties = {
    padding: '0.75rem 2rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'inline-block',
  };

  const membersContainerStyle: CSSProperties = {
    marginTop: '2rem',
    maxHeight: '60vh',
    overflowY: 'auto',
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '4px',
  };

  const tabContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  };

  const tabStyle = (isActive: boolean): CSSProperties => ({
    padding: '0.5rem 1.5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.3s ease',
  });

  const generationTitleStyle: CSSProperties = {
    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
    color: 'rgba(255, 255, 255, 0.9)',
  };

  const memberGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '1rem',
    textAlign: 'left',
  };

  const memberItemStyle: CSSProperties = {
    fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
    padding: '0.5rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
  };

  return (
    // ルート要素に quicksand.className を追加して、Quicksand フォントを適用
    <section id="member-list" ref={sectionRef} className={`${quicksand.className} member-list`} style={sectionStyle}>
      {/* 背景動画 */}
      <div style={videoContainerStyle}>
        <video ref={videoRef} loop muted playsInline style={videoStyle}>
          <source src="/videos/water-mobile.mp4" type="video/mp4" />
        </video>
        {/* オーバーレイ */}
        <div style={overlayStyle}></div>
      </div>
      
      {/* テキストコンテンツ */}
      <div style={contentContainerStyle}>
        <div style={contentStyle}>
          <motion.h2
            style={titleStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            MEMBER LIST
          </motion.h2>
          
          {!showMembers ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.div 
                style={buttonStyle}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMembers(true)}
              >
                メンバー名簿を見る
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div style={tabContainerStyle}>
                <div 
                  style={tabStyle(activeGeneration === '16th')}
                  onClick={() => setActiveGeneration('16th')}
                >
                  16th
                </div>
                <div 
                  style={tabStyle(activeGeneration === '17th')}
                  onClick={() => setActiveGeneration('17th')}
                >
                  17th
                </div>
              </div>
              
              <div style={membersContainerStyle}>
                <div style={generationTitleStyle}>
                  {activeGeneration === '16th' ? '16th' : '17th'}
                </div>
                <div style={memberGridStyle}>
                  {members[activeGeneration].map((member, index) => (
                    <div key={index} style={memberItemStyle}>
                      {member}
                    </div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                style={{ ...buttonStyle, marginTop: '1.5rem' }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMembers(false)}
              >
                閉じる
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
