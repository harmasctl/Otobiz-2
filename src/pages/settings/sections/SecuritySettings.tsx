import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Key, Smartphone } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useApp } from "@/context/AppContext";
import DeleteAccountDialog from "@/components/dialogs/DeleteAccountDialog";
import TwoFactorSetupDialog from "@/components/dialogs/TwoFactorSetupDialog";
import ChangePasswordDialog from "@/components/dialogs/ChangePasswordDialog";

export default function SecuritySettings() {
  const { user } = useApp();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showTwoFactorDialog, setShowTwoFactorDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [has2FA, setHas2FA] = useState(false);

  useEffect(() => {
    if (user) {
      check2FAStatus();
    }
  }, [user]);

  const check2FAStatus = async () => {
    try {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      setHas2FA(factors.totp.length > 0);
    } catch (error) {
      console.error("Error checking 2FA status:", error);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5" /> Security Settings
        </h3>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setShowPasswordDialog(true)}
          >
            <Key className="w-4 h-4 mr-2" />
            Change Password
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setShowTwoFactorDialog(true)}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            {has2FA ? "Manage" : "Enable"} Two-Factor Authentication
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-600"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>

      <DeleteAccountDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
      <TwoFactorSetupDialog
        open={showTwoFactorDialog}
        onOpenChange={setShowTwoFactorDialog}
        has2FA={has2FA}
        onStatusChange={check2FAStatus}
      />
      <ChangePasswordDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
      />
    </Card>
  );
}
