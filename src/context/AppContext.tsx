import { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User } from "@/types/auth";

interface AppContextType extends AuthContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  compareVehicles: any[];
  setCompareVehicles: (vehicles: any[]) => void;
  showCompareDrawer: boolean;
  setShowCompareDrawer: (show: boolean) => void;
  showCompareModal: boolean;
  setShowCompareModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [compareVehicles, setCompareVehicles] = useState<any[]>([]);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Auto login as admin for testing
    const adminUser = {
      id: "1",
      email: "admin@otobiz.com",
      name: "Admin User",
      role: "admin" as const,
    };
    setUser(adminUser);
    localStorage.setItem("user", JSON.stringify(adminUser));

    setIsLoading(false);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("theme", newValue ? "dark" : "light");
      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newValue;
    });
  };

  const login = async (email: string, password: string) => {
    try {
      // Mock login - replace with actual API call
      const mockUser = {
        id: "1",
        email,
        name: "John Doe",
        role: "admin" as const,
      };
      setUser(mockUser);
      setShowAuthModal(false);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // Mock registration - replace with actual API call
      const mockUser = {
        id: "1",
        email,
        name,
        role: "user" as const,
      };
      setUser(mockUser);
      setShowAuthModal(false);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        isDarkMode,
        toggleDarkMode,
        showAuthModal,
        setShowAuthModal,
        compareVehicles,
        setCompareVehicles,
        showCompareDrawer,
        setShowCompareDrawer,
        showCompareModal,
        setShowCompareModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export { AppProvider, useApp };
