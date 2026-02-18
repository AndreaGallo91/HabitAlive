import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { THEMES } from '../data/themes';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState(
    () => loadFromStorage('THEME') || 'default'
  );

  useEffect(() => { saveToStorage('THEME', activeTheme); }, [activeTheme]);

  useEffect(() => {
    const theme = THEMES[activeTheme] || THEMES.default;
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
  }, [activeTheme]);

  const changeTheme = useCallback((themeId) => {
    if (THEMES[themeId]) {
      setActiveTheme(themeId);
    }
  }, []);

  const value = {
    activeTheme,
    changeTheme,
    currentTheme: THEMES[activeTheme] || THEMES.default,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
