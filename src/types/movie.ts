export type MovieJournalEntry = [
  date: string,
  venue: string,
  companion: string,
  review: string,
  scores: number[],
];

export type MovieRecord = [
  title: string,
  year: number,
  genre: string,
  runtimeMinutes: number,
  director: string,
  favorite: boolean,
  tags: string[],
  watchlistStatus: string | null,
  posterUrl: string,
  journal: MovieJournalEntry[],
];

export interface MovieJournalState {
  library: MovieRecord[];
  journal: MovieJournalEntry[];
  watchlist: MovieRecord[];
}
