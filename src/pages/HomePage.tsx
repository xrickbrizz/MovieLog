import { ActivityFeed } from '../components/ActivityFeed';
import { RatingChart, RankingList, Timeline } from '../components/ChartsAndRanking';
import { ContinueWatching } from '../components/ContinueWatching';
import { FeatureReview } from '../components/FeatureReview';
import { MoviePoster } from '../components/MoviePoster';
import { SectionTitle } from '../components/SectionTitle';
import { StatsCards } from '../components/StatsCards';
import type { MovieRecord } from '../types/movie';

const filters = ['Género', 'Año', 'Visionados', 'Favoritas', 'Etiquetas', 'Fecha'];

export const HomePage = ({ movies, seenMovies }: { movies: MovieRecord[]; seenMovies: MovieRecord[] }) => (
  <>
    <section className="hero">
      <h1>Tu cine, <span>tu historia.</span></h1>
      <p>Captura cada fotograma, cada emoción y cada pensamiento en tu archivo personal de cine.</p>
      <div className="bigsearch">⌕ ¿Qué viste hoy?<kbd>CMD + K</kbd></div>
    </section>
    <ContinueWatching movies={seenMovies} />
    <SectionTitle title="Vistas recientemente" action="Ver historial →" />
    <div className="grid">{seenMovies.map((movie) => <MoviePoster movie={movie} key={movie.id} />)}</div>
    <div className="columns"><FeatureReview /><ActivityFeed /></div>
    <h1 id="estadísticas">Estadísticas</h1>
    <StatsCards movies={movies} />
    <RatingChart movies={seenMovies} />
    <h1 id="ranking">Ranking automático</h1>
    <RankingList movies={seenMovies} />
    <h1 id="cronología">Timeline</h1>
    <Timeline movies={seenMovies} />
    <h1 id="biblioteca">Biblioteca y filtros</h1>
    <div className="filters">{filters.map((filter) => <button key={filter}>{filter}</button>)}</div>
    <div className="grid">{movies.map((movie) => <MoviePoster movie={movie} key={movie.id} />)}</div>
  </>
);
