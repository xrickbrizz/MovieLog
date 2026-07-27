import type { MovieRecord } from '../types/movie';

export const MoviePoster = ({ movie }: { movie: MovieRecord }) => (
  <a className="poster" href="#library" aria-label={`Abrir ${movie.title}`}>
    <img src={movie.posterUrl} alt={`Póster de ${movie.title}`} />
    <b>{movie.title}</b>
    <small>{movie.viewings.length ? 'Vista recientemente' : movie.watchlistStatus}</small>
  </a>
);
