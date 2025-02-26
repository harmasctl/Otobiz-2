import { supabase } from "./supabase";

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error signing in with email:", error);
    return { data: null, error };
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string,
) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error signing up:", error);
    return { data: null, error };
  }
}

export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return { data: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error signing out:", error);
    return { error };
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { error };
  }
}

export async function updatePassword(password: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error updating password:", error);
    return { error };
  }
}

export async function updateProfile(userId: string, data: any) {
  try {
    const { error } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", userId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { error };
  }
}
