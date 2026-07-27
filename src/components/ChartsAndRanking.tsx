import type { MovieRecord } from '../types/movie';
import { averageScore, movieAverage } from '../utils/movieMetrics';

export const RatingChart = ({ movies }: { movies: MovieRecord[] }) => (
  <div className="chart">
    <h2>Promedio por película</h2>
    <div className="bar">
      {movies.map((movie) => <i key={movie[0]} title={`${movie[0]} ${movieAverage(movie)}★`} style={{ height: `${movieAverage(movie) * 38}px` }} />)}
    </div>
  </div>
);

export const RankingList = ({ movies }: { movies: MovieRecord[] }) => (
  <div>
    {[...movies].sort((a, b) => movieAverage(b) - movieAverage(a)).map((movie, index) => (
      <div className="rank" key={movie[0]}>
        <b>#{index + 1}</b>
        <img src={movie[8]} alt={`Póster de ${movie[0]}`} />
        <span>{movie[0]}</span>
        <em>{movieAverage(movie)} ★</em>
      </div>
    ))}
  </div>
);

export const Timeline = ({ movies }: { movies: MovieRecord[] }) => (
  <div className="timeline">
    {movies.flatMap((movie) => movie[9].map((viewing) => (
      <div className="day" key={`${movie[0]}-${viewing[0]}`}>
        <b>{viewing[0]}</b>
        <span>{movie[0]}</span>
        <small>{averageScore(viewing[4])} ★ · {viewing[3]}</small>
      </div>
    )))}
  </div>
);
