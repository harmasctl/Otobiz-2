import { Suspense, useEffect, useState } from "react";
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import routes from "./routes";
import tempoRoutes from "tempo-routes";
import AuthModal from "./components/auth/AuthModal";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const tempoRoutesElement =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(tempoRoutes) : null;

  const appRoutes = useRoutes(routes);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setShowAuthModal(false);
        navigate("/");
      } else if (event === "SIGNED_IN") {
        setShowAuthModal(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
