import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // Create or update profile
          const { error: profileError } = await supabase
            .from("profiles")
            .upsert({
              id: session.user.id,
              email: session.user.email,
              full_name:
                session.user.user_metadata.full_name ||
                session.user.user_metadata.name,
              avatar_url:
                session.user.user_metadata.avatar_url ||
                session.user.user_metadata.picture,
              updated_at: new Date().toISOString(),
            });

          if (profileError) throw profileError;

          // Redirect to profile
          window.location.href = "/profile";
          return;
        }

        navigate("/");
      } catch (error) {
        console.error("Error in auth callback:", error);
        navigate("/");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
