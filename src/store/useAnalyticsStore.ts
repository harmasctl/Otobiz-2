import { create } from "zustand";
import { supabase } from "@/lib/supabase";

interface AnalyticsState {
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  users: {
    total: number;
    active: number;
    new: number;
  };
  listings: {
    total: number;
    active: number;
    pending: number;
  };
  loading: boolean;
  error: string | null;
  fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  revenue: {
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
  },
  users: {
    total: 0,
    active: 0,
    new: 0,
  },
  listings: {
    total: 0,
    active: 0,
    pending: 0,
  },
  loading: false,
  error: null,

  fetchAnalytics: async () => {
    set({ loading: true, error: null });
    try {
      // Try to get cached data first
      const { data: cached } = await supabase
        .from("analytics_cache")
        .select("data")
        .eq("id", "global")
        .single();

      if (cached?.data) {
        set(cached.data);
        return;
      }

      // If no cache, calculate fresh data
      const data = await calculateAnalytics();
      set(data);
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
