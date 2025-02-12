export interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  monthlyPayment?: {
    amount: number;
    months: number;
    deposit?: number;
  };
  location: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize?: string;
  bodyType?: string;
  color?: string;
  doors?: number;
  features?: string[];
  description?: string;
  images: string[];
  mainImage: string;
  status: "available" | "sold" | "pending";
  condition: "new" | "used" | "certified";
  sellerId: string;
  sellerType: "private" | "dealer";
  createdAt: string;
  updatedAt: string;
  views: number;
  saves: number;
  boost?: {
    type: "highlight" | "featured" | "premium" | "urgent";
    expiresAt: string;
  };
}

export interface VehicleCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  count: number;
  subcategories?: VehicleCategory[];
}

export interface VehicleBrand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description?: string;
  count: number;
  models?: VehicleModel[];
}

export interface VehicleModel {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  image?: string;
  count: number;
  years?: number[];
  bodyTypes?: string[];
}

export interface VehicleFilters {
  make?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  fuelType?: string[];
  transmission?: string[];
  bodyType?: string[];
  condition?: ("new" | "used" | "certified")[];
  color?: string[];
  features?: string[];
  sellerType?: "private" | "dealer";
  location?: string;
  radius?: number;
  sort?: "price_asc" | "price_desc" | "date_desc" | "mileage_asc" | "year_desc";
}

export interface VehicleAnnouncement {
  id: string;
  title: string;
  description: string;
  type: "news" | "promotion" | "update";
  image?: string;
  link?: string;
  createdAt: string;
  expiresAt?: string;
  priority: "low" | "medium" | "high";
}

export interface VehicleFinanceOption {
  id: string;
  name: string;
  type: "pcp" | "hp" | "lease";
  apr: number;
  minDeposit: number;
  maxTerm: number;
  minAmount: number;
  maxAmount: number;
  monthlyPayment?: number;
  totalPayable?: number;
  documentation?: string[];
  requirements?: string[];
}
