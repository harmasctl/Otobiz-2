import { authenticator } from "otplib";
import { supabase } from "@/lib/supabase";

interface TwoFactorSetupResult {
  success: boolean;
  secret?: string;
  backupCodes?: string[];
  otpauth?: string;
  error?: any;
}

interface TwoFactorVerifyResult {
  success: boolean;
  method?: "totp" | "backup";
  error?: any;
}

export async function setupTwoFactor(
  userId: string,
): Promise<TwoFactorSetupResult> {
  try {
    // Generate secret
    const secret = authenticator.generateSecret();
    const backupCodes = Array.from({ length: 10 }, () =>
      Math.random().toString(36).substr(2, 8),
    );

    // Save 2FA details
    const { error } = await supabase.from("two_factor_auth").insert({
      user_id: userId,
      secret,
      backup_codes: backupCodes,
      enabled: false,
    });

    if (error) throw error;

    // Generate QR code URL
    const otpauth = authenticator.keyuri(userId, "Otobiz", secret);

    return {
      success: true,
      secret,
      backupCodes,
      otpauth,
    };
  } catch (error) {
    console.error("Error setting up 2FA:", error);
    return { success: false, error };
  }
}

export async function verifyTwoFactor(
  userId: string,
  token: string,
): Promise<TwoFactorVerifyResult> {
  try {
    const { data, error } = await supabase
      .from("two_factor_auth")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    if (!data) throw new Error("2FA not set up");

    const isValid = authenticator.verify({
      token,
      secret: data.secret,
    });

    if (!isValid) {
      // Check backup codes
      const isBackupCode = data.backup_codes.includes(token);
      if (isBackupCode) {
        // Remove used backup code
        const newBackupCodes = data.backup_codes.filter(
          (code: string) => code !== token,
        );
        await supabase
          .from("two_factor_auth")
          .update({
            backup_codes: newBackupCodes,
          })
          .eq("user_id", userId);
        return { success: true, method: "backup" };
      }
      throw new Error("Invalid 2FA token");
    }

    // Enable 2FA if this is the first successful verification
    if (!data.enabled) {
      await supabase
        .from("two_factor_auth")
        .update({ enabled: true })
        .eq("user_id", userId);
    }

    return { success: true, method: "totp" };
  } catch (error) {
    console.error("Error verifying 2FA:", error);
    return { success: false, error };
  }
}

export async function disableTwoFactor(
  userId: string,
): Promise<{ success: boolean; error?: any }> {
  try {
    const { error } = await supabase
      .from("two_factor_auth")
      .delete()
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error disabling 2FA:", error);
    return { success: false, error };
  }
}
