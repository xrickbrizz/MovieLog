import type { MovieRecord, Viewing, ViewingRatings } from '../types/movie';

const ratingKeys: Array<keyof ViewingRatings> = [
  'historia',
  'actuaciones',
  'bandaSonora',
  'final',
  'entretenimiento',
  'rewatch',
  'originalidad',
];

export const calculateViewingFinalScore = (ratings: ViewingRatings): number => {
  const total = ratingKeys.reduce((sum, key) => sum + ratings[key], 0);
  return Number((total / ratingKeys.length).toFixed(1));
};

export const getSeenMovies = (movies: MovieRecord[]): MovieRecord[] => movies.filter((movie) => movie.viewings.length);

export const getAllViewings = (movies: MovieRecord[]): Viewing[] => movies.flatMap((movie) => movie.viewings);

export const getTotalHours = (movies: MovieRecord[]): number =>
  Math.round(getSeenMovies(movies).reduce((total, movie) => total + movie.runtimeMinutes * movie.viewings.length, 0) / 60);

export const getGlobalViewingAverage = (movies: MovieRecord[]): string => {
  const viewings = getAllViewings(movies);

  if (!viewings.length) {
    return '0.0';
  }

  return (viewings.reduce((total, viewing) => total + viewing.finalScore, 0) / viewings.length).toFixed(1);
};

export const getLatestViewing = (movie: MovieRecord): Viewing | undefined =>
  [...movie.viewings].sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime())[0];

export const getRankedMoviesByLatestViewing = (movies: MovieRecord[]): MovieRecord[] =>
  getSeenMovies(movies).sort((a, b) => (getLatestViewing(b)?.finalScore ?? 0) - (getLatestViewing(a)?.finalScore ?? 0));
