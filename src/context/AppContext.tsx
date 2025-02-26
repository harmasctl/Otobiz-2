import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/auth";
import { supabase } from "@/lib/supabase";

interface AppContextType {
  user: User | null;
  isLoading: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user ?? null);
        setShowAuthModal(false);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setShowAuthModal(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setShowAuthModal(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    isDarkMode,
    toggleDarkMode,
    showAuthModal,
    setShowAuthModal,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
