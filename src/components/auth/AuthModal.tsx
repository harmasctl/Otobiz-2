import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome } from "lucide-react";
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { useApp } from "@/context/AppContext";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { supabase } from "@/lib/supabase";

interface TwoFactorFormProps {
  onSubmit: (code: string) => void;
  onCancel: () => void;
  loading: boolean;
}

function TwoFactorForm({ onSubmit, onCancel, loading }: TwoFactorFormProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Authentication Code</Label>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength={6}
          required
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={loading || code.length !== 6}
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </form>
  );
}

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const { setShowAuthModal } = useApp();
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      // Validate input
      const result = loginSchema.safeParse(data);
      if (!result.success) {
        toast({
          title: "Validation Error",
          description: result.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }

      // Sign in
      const { data: authData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (signInError) throw signInError;

      // Check MFA status
      const { data: mfaData } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (mfaData.nextLevel === "aal2") {
        // User has MFA enabled and needs to complete verification
        setShowTwoFactor(true);
      } else {
        // No MFA required, complete login
        toast({
          title: "Success",
          description: "Successfully signed in!",
        });
        setShowAuthModal(false);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTwoFactorSubmit = async (code: string) => {
    if (loading) return;
    setLoading(true);

    try {
      // Get the enrolled factors
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const totp = factors.totp[0];

      if (!totp) throw new Error("No TOTP factor found");

      // Challenge and verify
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({
          factorId: totp.id,
        });

      if (challengeError) throw challengeError;

      const { data, error: verifyError } = await supabase.auth.mfa.verify({
        factorId: totp.id,
        challengeId: challengeData.id,
        code,
      });

      if (verifyError) throw verifyError;

      // Complete login
      toast({
        title: "Success",
        description: "Successfully verified!",
      });
      setShowTwoFactor(false);
      setShowAuthModal(false);
    } catch (error: any) {
      console.error("2FA verification error:", error);
      toast({
        title: "Error",
        description: "Invalid verification code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        fullName: formData.get("fullName") as string,
      };

      // Validate input
      const result = registerSchema.safeParse(data);
      if (!result.success) {
        toast({
          title: "Validation Error",
          description: result.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }

      const { error } = await signUpWithEmail(
        data.email,
        data.password,
        data.fullName,
      );

      if (error) throw error;

      toast({
        title: "Success",
        description: "Account created successfully! Please verify your email.",
      });

      setShowAuthModal(false);
      navigate("/onboarding");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {showTwoFactor
              ? "Two-Factor Authentication"
              : tab === "login"
                ? "Welcome Back"
                : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {showTwoFactor
              ? "Enter the code from your authenticator app"
              : tab === "login"
                ? "Sign in to your account"
                : "Create a new account"}
          </DialogDescription>
        </DialogHeader>

        {showTwoFactor ? (
          <TwoFactorForm
            onSubmit={handleTwoFactorSubmit}
            onCancel={() => {
              setShowTwoFactor(false);
            }}
            loading={loading}
          />
        ) : (
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as "login" | "register")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registerEmail">Email</Label>
                  <Input
                    id="registerEmail"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registerPassword">Password</Label>
                  <Input
                    id="registerPassword"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
