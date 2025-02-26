import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];
type VehicleInsert = Database["public"]["Tables"]["vehicles"]["Insert"];
type VehicleUpdate = Database["public"]["Tables"]["vehicles"]["Update"];

interface VehicleFilters {
  status?: string;
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
}

interface VehicleAdminState {
  vehicles: Vehicle[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  filters: VehicleFilters;
  fetchVehicles: (page?: number, limit?: number) => Promise<void>;
  setFilters: (filters: VehicleFilters) => void;
  createVehicle: (data: VehicleInsert) => Promise<void>;
  updateVehicle: (id: string, data: VehicleUpdate) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  approveVehicle: (id: string) => Promise<void>;
  rejectVehicle: (id: string) => Promise<void>;
}

export const useVehicleAdminStore = create<VehicleAdminState>((set, get) => ({
  vehicles: [],
  totalCount: 0,
  loading: false,
  error: null,
  filters: {},

  setFilters: (filters) => set({ filters }),

  fetchVehicles: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      let query = supabase
        .from("vehicles")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      const { filters } = get();
      if (filters.status) query = query.eq("status", filters.status);
      if (filters.make) query = query.eq("make", filters.make);
      if (filters.model) query = query.eq("model", filters.model);
      if (filters.minPrice) query = query.gte("price", filters.minPrice);
      if (filters.maxPrice) query = query.lte("price", filters.maxPrice);
      if (filters.minYear) query = query.gte("year", filters.minYear);
      if (filters.maxYear) query = query.lte("year", filters.maxYear);

      const { data, error, count } = await query;

      if (error) throw error;
      set({ vehicles: data || [], totalCount: count || 0 });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  createVehicle: async (data) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from("vehicles").insert([data]);
      if (error) throw error;
      await get().fetchVehicles();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateVehicle: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from("vehicles")
        .update(data)
        .eq("id", id);

      if (error) throw error;
      await get().fetchVehicles();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  deleteVehicle: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from("vehicles").delete().eq("id", id);
      if (error) throw error;
      await get().fetchVehicles();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  approveVehicle: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from("vehicles")
        .update({ status: "active" })
        .eq("id", id);

      if (error) throw error;
      await get().fetchVehicles();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  rejectVehicle: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from("vehicles")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;
      await get().fetchVehicles();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
