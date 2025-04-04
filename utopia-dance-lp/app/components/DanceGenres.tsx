// app/components/DanceGenres.tsx
'use client';

import React from 'react';
import DanceGenre, { DanceGenreProps } from './DanceGenre';

interface ConcertGenre {
  id: string;
  name: string;
  href: string;
}

interface DanceGenresProps {
  genres: DanceGenreProps[];
  concertGenres?: ConcertGenre[]; // オプショナルとして追加
}

const DanceGenres: React.FC<DanceGenresProps> = ({ genres}) => {
  return (
    <div>
      {/* 既存のレイアウト：各 DanceGenre をそのままレンダリング */}
      <div>
        {genres.map((genre) => (
          <DanceGenre key={genre.id} {...genre} />
        ))}
      </div>
    </div>
  );
};

export default DanceGenres;
export type { DanceGenreProps };
