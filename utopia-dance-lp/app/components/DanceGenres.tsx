// app/components/DanceGenres.tsx
'use client';

import React from 'react';
import DanceGenre, { DanceGenreProps } from './DanceGenre';

interface DanceGenresProps {
  genres: DanceGenreProps[];
}

const DanceGenres: React.FC<DanceGenresProps> = ({ genres }) => {
  return (
    <>
      {genres.map((genre) => (
        // 各 DanceGenre コンポーネントには、genre のプロパティが渡される
        <DanceGenre key={genre.id} {...genre} />
      ))}
    </>
  );
};

export default DanceGenres;
export type { DanceGenreProps };
