import type { MovieJournalState, MovieRecord, Viewing, ViewingRatings } from '../../types/movie';
import { calculateViewingFinalScore } from '../../utils/movieMetrics';

const STORAGE_KEY = 'movie-journal-state';

const createRatings = (
  historia: number,
  actuaciones: number,
  bandaSonora: number,
  final: number,
  entretenimiento: number,
  rewatch: number,
  originalidad: number,
): ViewingRatings => ({ historia, actuaciones, bandaSonora, final, entretenimiento, rewatch, originalidad });

const createViewing = (
  id: string,
  viewedAt: string,
  location: string,
  watchedWith: string,
  comment: string,
  ratings: ViewingRatings,
): Viewing => ({
  id,
  viewedAt,
  location,
  watchedWith,
  comment,
  ratings,
  finalScore: calculateViewingFinalScore(ratings),
});

const INITIAL_LIBRARY: MovieRecord[] = [
  { id: 'oppenheimer-2023', title: 'Oppenheimer', year: 2023, genre: 'Drama', runtimeMinutes: 181, director: 'Christopher Nolan', favorite: true, tags: ['Obra maestra', 'Cine'], watchlistStatus: null, posterUrl: 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg', viewings: [createViewing('oppenheimer-2023-2026-07-22', '2026-07-22', 'Cine', 'Ana', 'Monumental, tensa y profundamente humana.', createRatings(5, 5, 5, 4, 5, 4, 5))] },
  { id: 'poor-things-2023', title: 'Poor Things', year: 2023, genre: 'Fantasía', runtimeMinutes: 141, director: 'Yorgos Lanthimos', favorite: false, tags: ['Originalidad'], watchlistStatus: null, posterUrl: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg', viewings: [createViewing('poor-things-2023-2026-07-21', '2026-07-21', 'Casa', 'Solo', 'Visualmente salvaje e impredecible.', createRatings(4, 5, 4, 4, 5, 4, 5))] },
  { id: 'parasite-2019', title: 'Parasite', year: 2019, genre: 'Thriller', runtimeMinutes: 132, director: 'Bong Joon-ho', favorite: true, tags: ['Final inesperado'], watchlistStatus: null, posterUrl: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', viewings: [createViewing('parasite-2019-2026-07-10', '2026-07-10', 'Sala', 'Amigos', 'Una sátira quirúrgica que mejora en cada revisión.', createRatings(5, 5, 4, 5, 5, 5, 5)), createViewing('parasite-2019-2025-02-12', '2025-02-12', 'Casa', 'Laura', 'El giro sigue golpeando fuerte.', createRatings(5, 5, 4, 5, 5, 5, 5))] },
  { id: 'drive-my-car-2021', title: 'Drive My Car', year: 2021, genre: 'Drama', runtimeMinutes: 179, director: 'Ryusuke Hamaguchi', favorite: false, tags: ['Lloré'], watchlistStatus: 'Recomendadas', posterUrl: 'https://image.tmdb.org/t/p/w500/ak91PHkZeb7qF3Ewjc1G2J6RZ67.jpg', viewings: [] },
  { id: 'aftersun-2022', title: 'Aftersun', year: 2022, genre: 'Drama', runtimeMinutes: 101, director: 'Charlotte Wells', favorite: true, tags: ['Lloré', 'Comfort Movie'], watchlistStatus: null, posterUrl: 'https://image.tmdb.org/t/p/w500/vX7k3PeiJ7kLbA3v04YKkzgt3jO.jpg', viewings: [createViewing('aftersun-2022-2026-07-24', '2026-07-24', 'Casa', 'Solo', 'Me dejó completamente roto.', createRatings(5, 5, 4, 5, 4, 5, 5))] },
  { id: 'dune-part-two-2024', title: 'Dune: Part Two', year: 2024, genre: 'Sci-Fi', runtimeMinutes: 166, director: 'Denis Villeneuve', favorite: false, tags: ['Cine'], watchlistStatus: 'Quiero verla', posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', viewings: [] },
];

const createInitialState = (): MovieJournalState => ({
  library: INITIAL_LIBRARY,
  journal: INITIAL_LIBRARY.flatMap((movie) => movie.viewings),
  watchlist: INITIAL_LIBRARY.filter((movie) => movie.watchlistStatus),
});

const isStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage);
  } catch {
    return false;
  }
};

const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const isString = (value: unknown): value is string => typeof value === 'string';

const isViewingRatings = (value: unknown): value is ViewingRatings => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<ViewingRatings>;
  return ['historia', 'actuaciones', 'bandaSonora', 'final', 'entretenimiento', 'rewatch', 'originalidad']
    .every((key) => isNumber(candidate[key as keyof ViewingRatings]));
};

const isViewing = (value: unknown): value is Viewing => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<Viewing>;
  return isString(candidate.id)
    && isString(candidate.viewedAt)
    && (candidate.location === undefined || isString(candidate.location))
    && (candidate.watchedWith === undefined || isString(candidate.watchedWith))
    && isString(candidate.comment)
    && isViewingRatings(candidate.ratings)
    && isNumber(candidate.finalScore);
};

const isMovieRecord = (value: unknown): value is MovieRecord => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<MovieRecord>;
  return isString(candidate.id)
    && isString(candidate.title)
    && isNumber(candidate.year)
    && isString(candidate.genre)
    && isNumber(candidate.runtimeMinutes)
    && isString(candidate.director)
    && typeof candidate.favorite === 'boolean'
    && Array.isArray(candidate.tags)
    && candidate.tags.every(isString)
    && (candidate.watchlistStatus === null || isString(candidate.watchlistStatus))
    && isString(candidate.posterUrl)
    && Array.isArray(candidate.viewings)
    && candidate.viewings.every(isViewing);
};

const refreshDerivedState = (library: MovieRecord[]): MovieJournalState => ({
  library,
  journal: library.flatMap((movie) => movie.viewings),
  watchlist: library.filter((movie) => movie.watchlistStatus),
});

const isMovieJournalState = (value: unknown): value is MovieJournalState => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<MovieJournalState>;
  return Array.isArray(candidate.library)
    && candidate.library.every(isMovieRecord)
    && Array.isArray(candidate.journal)
    && candidate.journal.every(isViewing)
    && Array.isArray(candidate.watchlist)
    && candidate.watchlist.every(isMovieRecord);
};

const recoverInitialState = (): MovieJournalState => {
  const initialState = createInitialState();
  writeMovieJournalState(initialState);
  return initialState;
};

export const readMovieJournalState = (): MovieJournalState => {
  if (!isStorageAvailable()) return createInitialState();

  const storedState = window.localStorage.getItem(STORAGE_KEY);
  if (!storedState) return recoverInitialState();

  try {
    const parsedState: unknown = JSON.parse(storedState);
    if (isMovieJournalState(parsedState)) return refreshDerivedState(parsedState.library);
  } catch (error) {
    console.error('No se pudo leer Movie Journal desde LocalStorage.', error);
  }

  return recoverInitialState();
};

export const writeMovieJournalState = (state: MovieJournalState): void => {
  if (!isStorageAvailable()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(refreshDerivedState(state.library)));
};

export const readLibrary = (): MovieRecord[] => readMovieJournalState().library;

export const writeLibrary = (library: MovieRecord[]): void => {
  writeMovieJournalState(refreshDerivedState(library));
};

export const readJournal = (): Viewing[] => readMovieJournalState().journal;
export const writeJournal = (journal: Viewing[]): void => {
  const currentState = readMovieJournalState();
  writeMovieJournalState({ ...currentState, journal });
};

export const readWatchlist = (): MovieRecord[] => readMovieJournalState().watchlist;
export const writeWatchlist = (watchlist: MovieRecord[]): void => {
  const currentState = readMovieJournalState();
  writeMovieJournalState({ ...currentState, watchlist });
};

export const addViewing = (movieId: string, viewing: Omit<Viewing, 'finalScore'>): MovieJournalState => {
  const currentState = readMovieJournalState();
  const nextLibrary = currentState.library.map((movie) => movie.id === movieId
    ? { ...movie, viewings: [...movie.viewings, { ...viewing, finalScore: calculateViewingFinalScore(viewing.ratings) }] }
    : movie);
  const nextState = refreshDerivedState(nextLibrary);
  writeMovieJournalState(nextState);
  return nextState;
};

export const updateViewing = (movieId: string, viewingId: string, viewing: Omit<Viewing, 'id' | 'finalScore'>): MovieJournalState => {
  const currentState = readMovieJournalState();
  const nextLibrary = currentState.library.map((movie) => movie.id === movieId
    ? { ...movie, viewings: movie.viewings.map((item) => item.id === viewingId ? { ...item, ...viewing, finalScore: calculateViewingFinalScore(viewing.ratings) } : item) }
    : movie);
  const nextState = refreshDerivedState(nextLibrary);
  writeMovieJournalState(nextState);
  return nextState;
};

export const deleteViewing = (movieId: string, viewingId: string): MovieJournalState => {
  const currentState = readMovieJournalState();
  const nextLibrary = currentState.library.map((movie) => movie.id === movieId
    ? { ...movie, viewings: movie.viewings.filter((viewing) => viewing.id !== viewingId) }
    : movie);
  const nextState = refreshDerivedState(nextLibrary);
  writeMovieJournalState(nextState);
  return nextState;
};
