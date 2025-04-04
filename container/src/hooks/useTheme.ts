import { useState, useEffect } from "react";

const useTheme = (initialTheme: string) => {
  const [theme, setTheme] = useState<string>(initialTheme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme,setTheme };
};

export default useTheme;