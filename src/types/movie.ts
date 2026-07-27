export interface ViewingRatings {
  historia: number;
  actuaciones: number;
  bandaSonora: number;
  final: number;
  entretenimiento: number;
  rewatch: number;
  originalidad: number;
}

export interface Viewing {
  id: string;
  viewedAt: string;
  location?: string;
  watchedWith?: string;
  comment: string;
  ratings: ViewingRatings;
  finalScore: number;
}

export interface MovieRecord {
  id: string;
  title: string;
  year: number;
  genre: string;
  runtimeMinutes: number;
  director: string;
  favorite: boolean;
  tags: string[];
  watchlistStatus: string | null;
  posterUrl: string;
  viewings: Viewing[];
}

export interface MovieJournalState {
  library: MovieRecord[];
  journal: Viewing[];
  watchlist: MovieRecord[];
}
