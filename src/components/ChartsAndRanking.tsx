import type { MovieRecord } from '../types/movie';
import { getLatestViewing, getRankedMoviesByLatestViewing } from '../utils/movieMetrics';

export const RatingChart = ({ movies }: { movies: MovieRecord[] }) => (
  <div className="chart">
    <h2>Último visionado por película</h2>
    <div className="bar">
      {movies.map((movie) => {
        const latestViewing = getLatestViewing(movie);
        const score = latestViewing?.finalScore ?? 0;
        return <i key={movie.id} title={`${movie.title} ${score}★`} style={{ height: `${score * 38}px` }} />;
      })}
    </div>
  </div>
);

export const RankingList = ({ movies }: { movies: MovieRecord[] }) => (
  <div>
    {getRankedMoviesByLatestViewing(movies).map((movie, index) => {
      const latestViewing = getLatestViewing(movie);
      return (
        <div className="rank" key={movie.id}>
          <b>#{index + 1}</b>
          <img src={movie.posterUrl} alt={`Póster de ${movie.title}`} />
          <span>{movie.title}</span>
          <em>{latestViewing?.finalScore ?? '—'} ★</em>
        </div>
      );
    })}
  </div>
);

export const Timeline = ({ movies }: { movies: MovieRecord[] }) => (
  <div className="timeline">
    {movies.flatMap((movie) => movie.viewings.map((viewing) => (
      <div className="day" key={`${movie.id}-${viewing.id}`}>
        <b>{viewing.viewedAt}</b>
        <span>{movie.title}</span>
        <small>{viewing.finalScore} ★ · {viewing.comment}</small>
      </div>
    )))}
  </div>
);
