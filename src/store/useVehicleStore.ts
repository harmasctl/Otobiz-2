import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabase";
import { Vehicle, VehicleFilters } from "@/types/vehicle";

interface State {
  vehicles: Vehicle[];
  featuredVehicles: Vehicle[];
  compareVehicles: Vehicle[];
  savedVehicles: string[];
  filters: VehicleFilters;
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}

interface Actions {
  fetchVehicles: () => Promise<void>;
  fetchFeaturedVehicles: () => Promise<void>;
  addToCompare: (vehicle: Vehicle) => void;
  removeFromCompare: (vehicleId: string) => void;
  toggleSaved: (vehicleId: string) => Promise<void>;
  setFilters: (filters: Partial<VehicleFilters>) => void;
  clearFilters: () => void;
  setSearchTerm: (term: string) => void;
  createVehicle: (
    data: Omit<Vehicle, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;
  updateVehicle: (id: string, data: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
}

export const useVehicleStore = create<State & Actions>(
  persist(
    (set, get) => ({
      vehicles: [],
      featuredVehicles: [],
      compareVehicles: [],
      savedVehicles: [],
      filters: {},
      searchTerm: "",
      isLoading: false,
      error: null,

      fetchVehicles: async () => {
        set({ isLoading: true, error: null });
        try {
          let query = supabase
            .from("vehicles")
            .select("*")
            .eq("status", "active")
            .order("created_at", { ascending: false });

          const { filters } = get();
          if (filters.make) query = query.eq("make", filters.make);
          if (filters.model) query = query.eq("model", filters.model);
          if (filters.minYear) query = query.gte("year", filters.minYear);
          if (filters.maxYear) query = query.lte("year", filters.maxYear);
          if (filters.minPrice) query = query.gte("price", filters.minPrice);
          if (filters.maxPrice) query = query.lte("price", filters.maxPrice);

          const { data, error } = await query;

          if (error) throw error;
          set({ vehicles: data || [] });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },

      fetchFeaturedVehicles: async () => {
        try {
          const { data, error } = await supabase
            .from("vehicles")
            .select("*")
            .eq("status", "active")
            .eq("metadata->featured", true)
            .limit(8);

          if (error) throw error;
          set({ featuredVehicles: data || [] });
        } catch (error) {
          console.error("Error fetching featured vehicles:", error);
        }
      },

      addToCompare: (vehicle) =>
        set((state) => ({
          compareVehicles:
            state.compareVehicles.length < 3
              ? [...state.compareVehicles, vehicle]
              : state.compareVehicles,
        })),

      removeFromCompare: (vehicleId) =>
        set((state) => ({
          compareVehicles: state.compareVehicles.filter(
            (v) => v.id !== vehicleId,
          ),
        })),

      toggleSaved: async (vehicleId) => {
        const { savedVehicles } = get();
        const isSaved = savedVehicles.includes(vehicleId);

        if (isSaved) {
          await supabase
            .from("saved_vehicles")
            .delete()
            .eq("vehicle_id", vehicleId);

          set({
            savedVehicles: savedVehicles.filter((id) => id !== vehicleId),
          });
        } else {
          await supabase.from("saved_vehicles").insert({
            vehicle_id: vehicleId,
          });

          set({ savedVehicles: [...savedVehicles, vehicleId] });
        }
      },

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      clearFilters: () => set({ filters: {} }),

      setSearchTerm: (searchTerm) => set({ searchTerm }),

      createVehicle: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { error } = await supabase.from("vehicles").insert([data]);
          if (error) throw error;
          await get().fetchVehicles();
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },

      updateVehicle: async (id, data) => {
        set({ isLoading: true, error: null });
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
          set({ isLoading: false });
        }
      },

      deleteVehicle: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const { error } = await supabase
            .from("vehicles")
            .delete()
            .eq("id", id);
          if (error) throw error;
          await get().fetchVehicles();
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "vehicle-store",
      partialize: (state) => ({
        savedVehicles: state.savedVehicles,
        compareVehicles: state.compareVehicles,
      }),
    },
  ),
);
