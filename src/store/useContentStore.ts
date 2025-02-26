import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type Content = Database["public"]["Tables"]["content"]["Row"];

interface ContentState {
  items: Content[];
  loading: boolean;
  error: string | null;
  fetchContent: () => Promise<void>;
  createContent: (
    data: Omit<Content, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;
  updateContent: (id: string, data: Partial<Content>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
}

export const useContentStore = create<ContentState>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchContent: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      set({ items: data || [] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  createContent: async (data) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from("content").insert([data]);
      if (error) throw error;
      await get().fetchContent();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateContent: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from("content")
        .update(data)
        .eq("id", id);

      if (error) throw error;
      await get().fetchContent();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  deleteContent: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from("content").delete().eq("id", id);
      if (error) throw error;
      await get().fetchContent();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
