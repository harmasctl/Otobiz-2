import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

interface TwoFactorSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  has2FA: boolean;
  onStatusChange: () => void;
}

export default function TwoFactorSetupDialog({
  open,
  onOpenChange,
  has2FA,
  onStatusChange,
}: TwoFactorSetupDialogProps) {
  const { user } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [factorId, setFactorId] = useState<string>();
  const [qrCode, setQrCode] = useState<string>();
  const [token, setToken] = useState("");
  const [challenge, setChallenge] = useState<any>();

  useEffect(() => {
    if (open && !has2FA) {
      handleSetup();
    }
  }, [open, has2FA]);

  const handleSetup = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Check if already enrolled
      const { data: factors } = await supabase.auth.mfa.listFactors();
      if (factors.totp.length > 0) {
        toast({
          title: "Error",
          description: "2FA is already set up",
          variant: "destructive",
        });
        return;
      }

      // Start MFA enrollment
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        issuer: "Otobiz",
        friendlyName: `${user.email}'s 2FA`,
      });

      if (error) throw error;

      setFactorId(data.id);
      setQrCode(data.totp.qr_code);
      setStep(2);
    } catch (error) {
      console.error("Error setting up 2FA:", error);
      toast({
        title: "Error",
        description: "Failed to set up 2FA",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!user || !factorId) return;
    setLoading(true);

    try {
      // Verify the TOTP code
      const { error } = await supabase.auth.mfa.verify({
        factorId,
        code: token,
        challengeId: challenge?.id,
      });

      if (error) throw error;

      // Challenge and verify again to ensure it's working
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({
          factorId,
        });

      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code: token,
      });

      if (verifyError) throw verifyError;

      toast({
        title: "Success",
        description: "2FA has been enabled successfully",
      });
      onStatusChange();
      onOpenChange(false);
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      toast({
        title: "Error",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Get enrolled factors
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const totp = factors.totp[0];

      if (!totp) throw new Error("No TOTP factor found");

      // Verify current code before disabling
      const { data: challengeData } = await supabase.auth.mfa.challenge({
        factorId: totp.id,
      });

      if (!token) {
        toast({
          title: "Error",
          description: "Please enter your current 2FA code to disable",
          variant: "destructive",
        });
        return;
      }

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: totp.id,
        challengeId: challengeData.id,
        code: token,
      });

      if (verifyError) {
        toast({
          title: "Error",
          description: "Invalid verification code",
          variant: "destructive",
        });
        return;
      }

      // Unenroll the factor
      const { error } = await supabase.auth.mfa.unenroll({
        factorId: totp.id,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "2FA has been disabled",
      });
      onStatusChange();
      onOpenChange(false);
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      toast({
        title: "Error",
        description: "Failed to disable 2FA",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {has2FA
              ? "Manage Two-Factor Authentication"
              : "Set Up Two-Factor Authentication"}
          </DialogTitle>
          <DialogDescription>
            {has2FA
              ? "Manage your two-factor authentication settings"
              : step === 1
                ? "Add an extra layer of security to your account"
                : "Scan the QR code with your authenticator app"}
          </DialogDescription>
        </DialogHeader>

        {has2FA ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Two-factor authentication is currently enabled for your account.
            </p>
            <Button
              variant="destructive"
              onClick={handleDisable}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Disabling..." : "Disable 2FA"}
            </Button>
          </div>
        ) : step === 1 ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Two-factor authentication adds an extra layer of security to your
              account by requiring a verification code in addition to your
              password.
            </p>
            <Button onClick={handleSetup} disabled={loading} className="w-full">
              {loading ? "Setting up..." : "Begin Setup"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                {qrCode && (
                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="border p-2 rounded"
                  />
                )}
              </div>
              <p className="text-sm text-center text-gray-600">
                Scan this QR code with your authenticator app
              </p>
            </div>

            <div className="space-y-2">
              <Label>Verification Code</Label>
              <Input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
            </div>

            <Button
              onClick={handleVerify}
              disabled={loading || token.length !== 6}
              className="w-full"
            >
              {loading ? "Verifying..." : "Verify & Enable"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
