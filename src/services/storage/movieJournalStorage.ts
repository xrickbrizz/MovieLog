import type { MovieJournalEntry, MovieJournalState, MovieRecord } from '../../types/movie';

const STORAGE_KEY = 'movie-journal-state';

const INITIAL_LIBRARY: MovieRecord[] = [
  ['Oppenheimer', 2023, 'Drama', 181, 'Christopher Nolan', true, ['Obra maestra', 'Cine'], null, 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg', [['2026-07-22', 'Cine', 'Ana', 'Monumental, tensa y profundamente humana.', [5, 5, 5, 4, 5, 4, 5]]]],
  ['Poor Things', 2023, 'Fantasía', 141, 'Yorgos Lanthimos', false, ['Originalidad'], null, 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg', [['2026-07-21', 'Casa', 'Solo', 'Visualmente salvaje e impredecible.', [4, 5, 4, 4, 5, 4, 5]]]],
  ['Parasite', 2019, 'Thriller', 132, 'Bong Joon-ho', true, ['Final inesperado'], null, 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', [['2026-07-10', 'Sala', 'Amigos', 'Una sátira quirúrgica que mejora en cada revisión.', [5, 5, 4, 5, 5, 5, 5]], ['2025-02-12', 'Casa', 'Laura', 'El giro sigue golpeando fuerte.', [5, 5, 4, 5, 5, 5, 5]]]],
  ['Drive My Car', 2021, 'Drama', 179, 'Ryusuke Hamaguchi', false, ['Lloré'], 'Recomendadas', 'https://image.tmdb.org/t/p/w500/ak91PHkZeb7qF3Ewjc1G2J6RZ67.jpg', []],
  ['Aftersun', 2022, 'Drama', 101, 'Charlotte Wells', true, ['Lloré', 'Comfort Movie'], null, 'https://image.tmdb.org/t/p/w500/vX7k3PeiJ7kLbA3v04YKkzgt3jO.jpg', [['2026-07-24', 'Casa', 'Solo', 'Me dejó completamente roto.', [5, 5, 4, 5, 4, 5, 5]]]],
  ['Dune: Part Two', 2024, 'Sci-Fi', 166, 'Denis Villeneuve', false, ['Cine'], 'Quiero verla', 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', []],
];

const createInitialState = (): MovieJournalState => ({
  library: INITIAL_LIBRARY,
  journal: INITIAL_LIBRARY.flatMap((movie) => movie[9]),
  watchlist: INITIAL_LIBRARY.filter((movie) => movie[7]),
});

const isStorageAvailable = (): boolean => typeof window !== 'undefined' && Boolean(window.localStorage);

export const readMovieJournalState = (): MovieJournalState => {
  if (!isStorageAvailable()) {
    return createInitialState();
  }

  const storedState = window.localStorage.getItem(STORAGE_KEY);
  if (!storedState) {
    const initialState = createInitialState();
    writeMovieJournalState(initialState);
    return initialState;
  }

  return JSON.parse(storedState) as MovieJournalState;
};

export const writeMovieJournalState = (state: MovieJournalState): void => {
  if (!isStorageAvailable()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const readLibrary = (): MovieRecord[] => readMovieJournalState().library;

export const writeLibrary = (library: MovieRecord[]): void => {
  const currentState = readMovieJournalState();
  writeMovieJournalState({ ...currentState, library });
};

export const readJournal = (): MovieJournalEntry[] => readMovieJournalState().journal;

export const writeJournal = (journal: MovieJournalEntry[]): void => {
  const currentState = readMovieJournalState();
  writeMovieJournalState({ ...currentState, journal });
};

export const readWatchlist = (): MovieRecord[] => readMovieJournalState().watchlist;

export const writeWatchlist = (watchlist: MovieRecord[]): void => {
  const currentState = readMovieJournalState();
  writeMovieJournalState({ ...currentState, watchlist });
};
