import type { MovieRecord } from '../types/movie';

export const MoviePoster = ({ movie }: { movie: MovieRecord }) => (
  <a className="poster" href="#library" aria-label={`Abrir ${movie[0]}`}>
    <img src={movie[8]} alt={`Póster de ${movie[0]}`} />
    <b>{movie[0]}</b>
    <small>{movie[9].length ? 'Vista recientemente' : movie[7]}</small>
  </a>
);
