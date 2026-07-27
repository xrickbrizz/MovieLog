import type { MovieRecord } from '../types/movie';
import { getAllViewings, getGlobalViewingAverage, getSeenMovies, getTotalHours } from '../utils/movieMetrics';

export const StatsCards = ({ movies }: { movies: MovieRecord[] }) => {
  const seenMovies = getSeenMovies(movies);
  const viewings = getAllViewings(movies);
  const stats = [
    ['Películas vistas', seenMovies.length],
    ['Visionados', viewings.length],
    ['Horas de cine', getTotalHours(movies)],
    ['Promedio de visionados', getGlobalViewingAverage(movies)],
    ['Favoritas', seenMovies.filter((movie) => movie.favorite).length],
  ];

  return <div className="cards">{stats.map(([label, value]) => <div className="stat" key={label}><small>{label}</small><strong>{value}</strong></div>)}</div>;
};
