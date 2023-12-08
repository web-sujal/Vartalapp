import { ReactNode, createContext, useEffect, useState } from "react";

export type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

const toggleDarkClass = (isDarkMode: boolean) => {
  const root = window.document.documentElement;
  if (isDarkMode) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem("darkMode", newDarkMode.toString());
      toggleDarkClass(newDarkMode);
      return newDarkMode;
    });
  };

  useEffect(() => {
    const mode = localStorage.getItem("darkMode") || false;
    if (mode === "true") {
      setIsDarkMode(true);
      toggleDarkClass(true);
    } else {
      setIsDarkMode(false);
      toggleDarkClass(false);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
