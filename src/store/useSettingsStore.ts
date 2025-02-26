import { create } from "zustand";
import { supabase } from "@/lib/supabase";

interface Settings {
  site: {
    name: string;
    description: string;
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
  };
  features: {
    registration: boolean;
    emailVerification: boolean;
    chat: boolean;
    reviews: boolean;
    comparisons: boolean;
  };
  email: {
    fromName: string;
    fromEmail: string;
    replyTo: string;
    footer: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

interface SettingsState {
  settings: Settings;
  loading: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
  updateSettings: (data: Partial<Settings>) => Promise<void>;
}

const defaultSettings: Settings = {
  site: {
    name: "Otobiz",
    description: "Your trusted vehicle marketplace",
    logo: "",
    favicon: "",
    primaryColor: "#00853f",
    secondaryColor: "#fdef42",
  },
  features: {
    registration: true,
    emailVerification: true,
    chat: true,
    reviews: true,
    comparisons: true,
  },
  email: {
    fromName: "Otobiz",
    fromEmail: "noreply@otobiz.com",
    replyTo: "support@otobiz.com",
    footer: "© 2024 Otobiz. All rights reserved.",
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: defaultSettings,
  loading: false,
  error: null,

  fetchSettings: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No settings found, create default
          await supabase.from("settings").insert([
            {
              id: "global",
              value: defaultSettings,
            },
          ]);
          set({ settings: defaultSettings });
        } else {
          throw error;
        }
      } else {
        set({ settings: data.value });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateSettings: async (data) => {
    set({ loading: true, error: null });
    try {
      const newSettings = { ...get().settings, ...data };
      const { error } = await supabase
        .from("settings")
        .update({ value: newSettings })
        .eq("id", "global");

      if (error) throw error;
      set({ settings: newSettings });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
