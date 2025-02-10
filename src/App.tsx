import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import AppRoutes from "./routes";
import Layout from "./components/layout/Layout";
import AuthModal from "./components/auth/AuthModal";
import { useApp } from "./context/AppContext";

export default function App() {
  const { showAuthModal, setShowAuthModal } = useApp();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Layout>
        <AppRoutes />
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </Layout>
    </Suspense>
  );
}
