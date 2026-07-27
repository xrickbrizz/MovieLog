import type { MovieRecord } from '../types/movie';
import { getGlobalAverage, getSeenMovies, getTotalHours } from '../utils/movieMetrics';

export const StatsCards = ({ movies }: { movies: MovieRecord[] }) => {
  const seenMovies = getSeenMovies(movies);
  const stats = [
    ['Películas vistas', seenMovies.length],
    ['Horas de cine', getTotalHours(movies)],
    ['Promedio', getGlobalAverage(movies)],
    ['Favoritas', seenMovies.filter((movie) => movie[5]).length],
  ];

  return <div className="cards">{stats.map(([label, value]) => <div className="stat" key={label}><small>{label}</small><strong>{value}</strong></div>)}</div>;
};
