export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  monthlyPrice?: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: string;
  horsepower: number;
  images: string[];
  features: string[];
  description: string;
  sellerId: string;
  location: string;
  status: "available" | "sold" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface VehicleFilters {
  make?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  transmission?: string;
  location?: string;
  radius?: number;
}
