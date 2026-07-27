import { useMemo } from 'react';
import { useMovieJournalContext } from '../context/MovieJournalContext';
import { getSeenMovies } from '../utils/movieMetrics';

export const useMovieJournal = () => {
  const { state, setState } = useMovieJournalContext();

  return useMemo(() => ({
    ...state,
    seenMovies: getSeenMovies(state.library),
    setState,
  }), [setState, state]);
};
