import { useMemo, useState } from 'react';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/HomePage';
import { useMovieJournal } from './hooks/useMovieJournal';

export const App = () => {
  const { library, seenMovies } = useMovieJournal();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return library;
    }

    return library.filter((movie) => movie.join(' ').toLowerCase().includes(query));
  }, [library, searchQuery]);

  const filteredSeenMovies = useMemo(
    () => seenMovies.filter((movie) => filteredMovies.includes(movie)),
    [filteredMovies, seenMovies],
  );

  return (
    <AppLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <HomePage movies={filteredMovies} seenMovies={filteredSeenMovies} />
    </AppLayout>
  );
};
