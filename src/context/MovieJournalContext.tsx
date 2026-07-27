import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { readMovieJournalState, writeMovieJournalState } from '../services/storage/movieJournalStorage';
import type { MovieJournalState } from '../types/movie';

interface MovieJournalContextValue {
  state: MovieJournalState;
  setState: (state: MovieJournalState) => void;
}

const MovieJournalContext = createContext<MovieJournalContextValue | undefined>(undefined);

export const MovieJournalProvider = ({ children }: { children: ReactNode }) => {
  const [state, updateState] = useState<MovieJournalState>(() => readMovieJournalState());

  const value = useMemo<MovieJournalContextValue>(() => ({
    state,
    setState: (nextState) => {
      updateState(nextState);
      writeMovieJournalState(nextState);
    },
  }), [state]);

  return <MovieJournalContext.Provider value={value}>{children}</MovieJournalContext.Provider>;
};

export const useMovieJournalContext = (): MovieJournalContextValue => {
  const context = useContext(MovieJournalContext);

  if (!context) {
    throw new Error('useMovieJournalContext must be used within MovieJournalProvider.');
  }

  return context;
};
