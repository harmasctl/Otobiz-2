import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome, Mail, Lock, User } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { signInWithGoogle } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, register } = useApp();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (isLogin) {
        await login(email, password);
        navigate("/");
      } else {
        const fullName = formData.get("fullName") as string;
        await register(email, password, fullName);
        navigate("/");
      }
    } catch (error) {
      setError(isLogin ? "Invalid credentials" : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="mt-2 text-gray-600">
              {isLogin
                ? "Sign in to your account"
                : "Join our vehicle marketplace"}
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="fullName"
                    name="fullName"
                    required
                    className="pl-10"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-500 text-center">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? isLogin
                  ? "Signing in..."
                  : "Creating account..."
                : isLogin
                  ? "Sign in"
                  : "Create account"}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Image/Info */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00853f] to-[#fdef42]">
          <div className="absolute inset-0 bg-black/20" />
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
            alt="Luxury Car"
            className="absolute inset-0 h-full w-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-md text-white text-center">
              <h3 className="text-4xl font-bold mb-6">Find Your Perfect Car</h3>
              <p className="text-lg opacity-90">
                Join our marketplace to discover amazing vehicles and connect
                with trusted sellers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
