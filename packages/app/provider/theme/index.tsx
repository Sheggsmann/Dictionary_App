import { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'nativewind';

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
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(mode);
  }, [mode, setColorScheme]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
