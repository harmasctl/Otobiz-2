import { useState, useEffect } from "react";
import { useProfile } from "./useProfile";

export function useTheme() {
  const { profile, updateProfile } = useProfile();
  const [theme, setTheme] = useState(profile?.theme_preference || "light");

  useEffect(() => {
    if (profile?.theme_preference) {
      setTheme(profile.theme_preference);
      applyTheme(profile.theme_preference);
    }
  }, [profile]);

  const applyTheme = (newTheme: string) => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    await updateProfile({ theme_preference: newTheme });
  };

  return { theme, toggleTheme };
}
