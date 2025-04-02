import { notFound } from 'next/navigation';
import DanceGenre from '@/components/DanceGenres';

type GenreData = {
  id: string;
  name: string;
  choreographer: string;
  performers: string[];
};

const genreData: { [key: string]: GenreData } = {
  M1: {
    id: 'M1',
    name: 'BREAK',
    choreographer: 'Choreographer 1',
    performers: ['Performer A', 'Performer B', 'Performer C'],
  },
  M2: {
    id: 'M2',
    name: 'GIRLS',
    choreographer: 'Choreographer 2',
    performers: ['Performer D', 'Performer E', 'Performer F'],
  },
  M3: {
    id: 'M3',
    name: 'NEW',
    choreographer: 'Choreographer 3',
    performers: ['Performer G', 'Performer H', 'Performer I'],
  },
  // 必要に応じて他のジャンルも追加
};

export default function GenrePage({ params }: { params: { id: string } }) {
  const { id } = params;
  // URL の id は小文字になっているので大文字に変換してデータを参照
  const genre = genreData[id.toUpperCase()];
  if (!genre) {
    notFound();
  }
  return <DanceGenre {...genre} />;
}
