import type { MovieRecord } from '../types/movie';

export const ContinueWatching = ({ movies }: { movies: MovieRecord[] }) => (
  <>
    <h2>Continuar viendo</h2>
    <div className="continue">
      {movies.slice(0, 2).map((movie) => (
        <div className="wide" key={movie.id} style={{ backgroundImage: `linear-gradient(90deg,#111,transparent),url(${movie.posterUrl})` }}>
          <small>MIN {Math.round(movie.runtimeMinutes * 0.65)} DE {movie.runtimeMinutes}</small>
          <b>{movie.title}</b>
          <progress value="65" max="100" />
        </div>
      ))}
      <div className="streak"><small>Diario personal</small><strong>{movies.length}</strong><span>películas registradas</span></div>
    </div>
  </>
);
