import type { MovieRecord } from '../types/movie';

export const ContinueWatching = ({ movies }: { movies: MovieRecord[] }) => (
  <>
    <h2>Continuar viendo</h2>
    <div className="continue">
      {movies.slice(0, 2).map((movie) => (
        <div className="wide" key={movie[0]} style={{ backgroundImage: `linear-gradient(90deg,#111,transparent),url(${movie[8]})` }}>
          <small>MIN {Math.round(movie[3] * 0.65)} DE {movie[3]}</small>
          <b>{movie[0]}</b>
          <progress value="65" max="100" />
        </div>
      ))}
      <div className="streak"><small>Diario personal</small><strong>{movies.length}</strong><span>películas registradas</span></div>
    </div>
  </>
);
