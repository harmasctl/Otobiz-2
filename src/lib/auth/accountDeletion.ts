import { supabase } from "@/lib/supabase";

export async function deleteAccount(userId: string) {
  try {
    // Delete user data from various tables
    await Promise.all([
      // Delete profile
      supabase.from("profiles").delete().eq("id", userId),
      // Delete notifications
      supabase.from("notifications").delete().eq("user_id", userId),
      // Delete 2FA settings
      supabase.from("two_factor_auth").delete().eq("user_id", userId),
      // Delete email verifications
      supabase.from("email_verifications").delete().eq("user_id", userId),
      // Delete seller profile if exists
      supabase.from("sellers").delete().eq("id", userId),
    ]);

    // Delete storage files
    const { data: files } = await supabase.storage
      .from("avatars")
      .list(`${userId}`);

    if (files?.length) {
      await supabase.storage
        .from("avatars")
        .remove(files.map((file) => `${userId}/${file.name}`));
    }

    // Finally, delete auth user
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error deleting account:", error);
    return { success: false, error };
  }
}
