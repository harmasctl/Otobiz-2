import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Vehicle,
  VehicleFilters,
  VehicleCategory,
  VehicleBrand,
  VehicleAnnouncement,
  VehicleFinanceOption,
} from "@/types/vehicle";
import {
  mockVehicles,
  mockCategories,
  mockBrands,
  mockAnnouncements,
} from "@/lib/mockData";

interface State {
  vehicles: Vehicle[];
  featuredVehicles: Vehicle[];
  recentVehicles: Vehicle[];
  similarVehicles: Vehicle[];
  compareVehicles: Vehicle[];
  savedVehicles: string[];
  viewedVehicles: string[];
  categories: VehicleCategory[];
  brands: VehicleBrand[];
  popularBrands: VehicleBrand[];
  filters: VehicleFilters;
  searchTerm: string;
  announcements: VehicleAnnouncement[];
  financeOptions: VehicleFinanceOption[];
  selectedFinanceOption?: VehicleFinanceOption;
  isLoading: boolean;
  error: string | null;
}

interface Actions {
  setVehicles: (vehicles: Vehicle[]) => void;
  setFeaturedVehicles: (vehicles: Vehicle[]) => void;
  addToCompare: (vehicle: Vehicle) => void;
  removeFromCompare: (vehicleId: string) => void;
  toggleSaved: (vehicleId: string) => void;
  setFilters: (filters: Partial<VehicleFilters>) => void;
  clearFilters: () => void;
  setSearchTerm: (term: string) => void;
  setSelectedFinanceOption: (option?: VehicleFinanceOption) => void;
}

export const useVehicleStore = create<State & Actions>(
  persist(
    (set) => ({
      vehicles: mockVehicles,
      featuredVehicles: mockVehicles.filter(
        (v) => v.boost?.type === "featured",
      ),
      recentVehicles: [],
      similarVehicles: [],
      compareVehicles: [],
      savedVehicles: [],
      viewedVehicles: [],
      categories: mockCategories,
      brands: mockBrands,
      popularBrands: mockBrands,
      filters: {},
      searchTerm: "",
      announcements: mockAnnouncements,
      financeOptions: [],
      isLoading: false,
      error: null,

      setVehicles: (vehicles) => set({ vehicles }),
      setFeaturedVehicles: (vehicles) => set({ featuredVehicles: vehicles }),
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
      toggleSaved: (vehicleId) =>
        set((state) => ({
          savedVehicles: state.savedVehicles.includes(vehicleId)
            ? state.savedVehicles.filter((id) => id !== vehicleId)
            : [...state.savedVehicles, vehicleId],
        })),
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),
      clearFilters: () => set({ filters: {} }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setSelectedFinanceOption: (option) =>
        set({ selectedFinanceOption: option }),
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
