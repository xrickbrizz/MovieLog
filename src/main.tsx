import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { MovieJournalProvider } from './context/MovieJournalContext';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MovieJournalProvider>
      <App />
    </MovieJournalProvider>
  </React.StrictMode>,
);
