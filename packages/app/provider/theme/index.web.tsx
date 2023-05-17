import { createContext, useState, useEffect } from 'react';

type ThemeContextProps = {
  mode: 'light' | 'dark';
  setMode(mode: 'light' | 'dark'): void;
};

const ThemeContext = createContext<ThemeContextProps>({
  mode: 'light',
  setMode: () => {},
});

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    switch (mode) {
      case 'dark':
        document.documentElement.classList.add('dark');
        break;
      case 'light':
        document.documentElement.classList.remove('dark');
        break;
      default:
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
