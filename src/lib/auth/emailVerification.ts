import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";

export async function sendVerificationEmail(userId: string, email: string) {
  try {
    // Generate verification token
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

    // Save verification record
    const { error } = await supabase.from("email_verifications").insert({
      user_id: userId,
      email,
      token,
      expires_at: expiresAt.toISOString(),
    });

    if (error) throw error;

    // Send verification email
    const verificationUrl = `${window.location.origin}/verify-email?token=${token}`;
    await sendEmail({
      to: email,
      subject: "Verify your email address",
      template: "email-verification",
      variables: {
        verificationUrl,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, error };
  }
}

export async function verifyEmail(token: string) {
  try {
    // Get verification record
    const { data, error } = await supabase
      .from("email_verifications")
      .select("*")
      .eq("token", token)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Invalid verification token");

    // Check if token is expired
    if (new Date(data.expires_at) < new Date()) {
      throw new Error("Verification token has expired");
    }

    // Mark email as verified
    const { error: updateError } = await supabase
      .from("email_verifications")
      .update({
        verified_at: new Date().toISOString(),
      })
      .eq("token", token);

    if (updateError) throw updateError;

    // Update user profile
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        email_verified: true,
      })
      .eq("id", data.user_id);

    if (profileError) throw profileError;

    return { success: true };
  } catch (error) {
    console.error("Error verifying email:", error);
    return { success: false, error };
  }
}
