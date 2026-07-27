import type { MovieRecord } from '../types/movie';

export const averageScore = (scores: number[]): number =>
  Number((scores.reduce((total, score) => total + score, 0) / scores.length).toFixed(1));

export const movieAverage = (movie: MovieRecord): number => {
  const journal = movie[9];

  if (!journal.length) {
    return 0;
  }

  return Number((journal.reduce((total, entry) => total + averageScore(entry[4]), 0) / journal.length).toFixed(1));
};

export const getSeenMovies = (movies: MovieRecord[]): MovieRecord[] => movies.filter((movie) => movie[9].length);

export const getTotalHours = (movies: MovieRecord[]): number =>
  Math.round(getSeenMovies(movies).reduce((total, movie) => total + movie[3] * movie[9].length, 0) / 60);

export const getGlobalAverage = (movies: MovieRecord[]): string => {
  const seenMovies = getSeenMovies(movies);

  if (!seenMovies.length) {
    return '0.0';
  }

  return (seenMovies.reduce((total, movie) => total + movieAverage(movie), 0) / seenMovies.length).toFixed(1);
};
