
// DanceGenres.tsx
import React from 'react';
import DanceGenre, { DanceGenreProps } from './DanceGenres';

// 複数のジャンルを受け取る props の型定義
interface DanceGenresProps {
  genres: DanceGenreProps[];
}

const DanceGenres: React.FC<DanceGenresProps> = ({ genres }) => {
  return (
    <>
      {genres.map((genre) => (
        <DanceGenre key={genre.id} {...genre} />
      ))}
    </>
  );
};

export default DanceGenres;
