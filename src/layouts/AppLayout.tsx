import type { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';

const navItems = [['⌂', 'Inicio'], ['◴', 'Cronología'], ['☆', 'Ranking'], ['▤', 'Biblioteca'], ['▱', 'Watchlist'], ['▥', 'Estadísticas']];

export const AppLayout = ({ children, searchQuery, onSearchChange }: { children: ReactNode; searchQuery: string; onSearchChange: (value: string) => void }) => {
  const { toggleTheme } = useTheme();

  return (
    <div className="app">
      <aside>
        <div className="brand"><span>▣</span><b>Movie Journal</b></div>
        <nav>{navItems.map(([icon, label], index) => <a className={index === 0 ? 'active' : undefined} href={`#${label.toLowerCase()}`} key={label}>{icon} <b>{label}</b></a>)}</nav>
        <button className="ghost" id="theme" onClick={toggleTheme}>☾ Tema</button>
      </aside>
      <main>
        <header>
          <div className="search">⌕ <input value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar películas, directores o actores..." /></div>
          <span>▥</span><span className="avatar">👤</span><span>⚙</span>
        </header>
        {children}
      </main>
    </div>
  );
};
