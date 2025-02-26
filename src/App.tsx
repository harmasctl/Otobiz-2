import { Suspense, useEffect } from "react";
import { useRoutes, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Car } from "lucide-react";
import Footer from "./components/layout/Footer";
import { Button } from "@/components/ui/button";
import routes from "./routes";
import tempoRoutes from "tempo-routes";
import { useApp } from "@/context/AppContext";
import AuthModal from "./components/auth/AuthModal";
import { useState } from "react";

function Header({
  showAuthModal,
  setShowAuthModal,
}: {
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}) {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  return (
    <header className="w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Car className="h-6 w-6" />
          <span className="text-xl font-bold">Otobiz</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Button variant="ghost" onClick={() => navigate("/marketplace")}>
            Marketplace
          </Button>
          <Button variant="ghost" onClick={() => navigate("/sell")}>
            Sell
          </Button>
          <Button variant="ghost" onClick={() => navigate("/about")}>
            About
          </Button>
          <Button variant="ghost" onClick={() => navigate("/contact")}>
            Contact
          </Button>
          {user?.role === "admin" && (
            <Button variant="ghost" onClick={() => navigate("/admin")}>
              Admin
            </Button>
          )}
          {user && (
            <Button variant="ghost" onClick={() => navigate("/seller")}>
              Seller Dashboard
            </Button>
          )}
          {user ? (
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button onClick={() => setShowAuthModal(true)}>Login</Button>
          )}
        </nav>
      </div>
    </header>
  );
}

function App() {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Handle auth state changes without reload
    });

    return () => subscription.unsubscribe();
  }, []);
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const tempoRoutesElement =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(tempoRoutes) : null;

  const appRoutes = useRoutes(routes);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
      />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          {appRoutes}
          {tempoRoutesElement}
        </Suspense>
      </main>
      {!location.pathname.startsWith("/admin") && <Footer />}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
}

export default App;
