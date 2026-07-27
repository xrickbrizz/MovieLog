const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface TmdbMovie {
  id: number;
  title: string;
  year: number | null;
  overview: string;
  posterUrl: string | null;
  voteAverage: number;
}

interface TmdbSearchResult {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
}

interface TmdbSearchResponse {
  results: TmdbSearchResult[];
}

const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error('VITE_TMDB_API_KEY is required to fetch movies from TMDb.');
  }

  return apiKey;
};

const toMovie = (movie: TmdbSearchResult): TmdbMovie => ({
  id: movie.id,
  title: movie.title ?? movie.name ?? 'Sin título',
  year: movie.release_date ? Number(movie.release_date.slice(0, 4)) : null,
  overview: movie.overview,
  posterUrl: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
  voteAverage: movie.vote_average,
});

export const searchMovies = async (query: string): Promise<TmdbMovie[]> => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const params = new URLSearchParams({
    api_key: getApiKey(),
    include_adult: 'false',
    language: 'es-ES',
    query: trimmedQuery,
  });

  const response = await fetch(`${TMDB_BASE_URL}/search/movie?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`TMDb request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as TmdbSearchResponse;
  return data.results.map(toMovie);
};
