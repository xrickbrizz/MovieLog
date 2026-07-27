import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light', isLight);
  }, [isLight]);

  return { isLight, toggleTheme: () => setIsLight((current) => !current) };
};
