import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import tempoRoutes from "tempo-routes";
import routes from "./routes";
import Layout from "./components/layout/Layout";
import AuthModal from "./components/auth/AuthModal";
import { useApp } from "./context/AppContext";

export default function App() {
  const { showAuthModal, setShowAuthModal } = useApp();
  const tempoRoutesElement =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(tempoRoutes) : null;
  const appRoutes = useRoutes(routes);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      {/* Only wrap non-admin routes with Layout */}
      {!window.location.pathname.startsWith("/admin") ? (
        <Layout>
          {appRoutes}
          {tempoRoutesElement}
        </Layout>
      ) : (
        <>
          {appRoutes}
          {tempoRoutesElement}
        </>
      )}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </Suspense>
  );
}
