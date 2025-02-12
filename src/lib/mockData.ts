import {
  Vehicle,
  VehicleCategory,
  VehicleBrand,
  VehicleAnnouncement,
} from "@/types/vehicle";

export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    title: "BMW 3 Series M Sport 2024",
    make: "BMW",
    model: "3 Series",
    year: 2024,
    price: 45000,
    monthlyPayment: {
      amount: 599,
      months: 48,
      deposit: 4500,
    },
    location: "Dakar, Senegal",
    mileage: 0,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "2.0L",
    bodyType: "Sedan",
    color: "Alpine White",
    doors: 4,
    features: [
      "LED Headlights",
      "Leather Interior",
      "Navigation System",
      "Parking Sensors",
      "Bluetooth",
    ],
    description:
      "Brand new BMW 3 Series with the latest technology and features.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      // Add more images
    ],
    mainImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    status: "available",
    condition: "new",
    sellerId: "dealer1",
    sellerType: "dealer",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 150,
    saves: 23,
    boost: {
      type: "featured",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  // Add more vehicles
];

export const mockCategories: VehicleCategory[] = [
  {
    id: "1",
    name: "Luxury Sedans",
    slug: "luxury-sedans",
    description: "Premium luxury sedans for the discerning buyer",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    count: 234,
  },
  // Add more categories
];

export const mockBrands: VehicleBrand[] = [
  {
    id: "1",
    name: "BMW",
    slug: "bmw",
    logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-blue-white.png",
    description: "Luxury German automotive manufacturer",
    count: 156,
    models: [
      {
        id: "1",
        brandId: "1",
        name: "3 Series",
        slug: "3-series",
        count: 45,
        years: [2020, 2021, 2022, 2023, 2024],
        bodyTypes: ["Sedan", "Touring"],
      },
    ],
  },
  // Add more brands
];

export const mockAnnouncements: VehicleAnnouncement[] = [
  {
    id: "1",
    title: "New Electric Vehicles Available",
    description: "Check out our latest collection of electric vehicles",
    type: "news",
    image: "https://images.unsplash.com/photo-1619767886558-efdc7b9e0473",
    link: "/category/electric-vehicles",
    createdAt: new Date().toISOString(),
    priority: "high",
  },
  // Add more announcements
];
