import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
