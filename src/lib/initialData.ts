import { supabase } from "./supabase";

export async function insertInitialData() {
  // Insert categories
  const categories = [
    {
      name: "SUV",
      slug: "suv",
      description: "Sport Utility Vehicles",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
      count: 0,
    },
    {
      name: "Sedan",
      slug: "sedan",
      description: "Classic Sedans",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      count: 0,
    },
    {
      name: "Electric",
      slug: "electric",
      description: "Electric Vehicles",
      image: "https://images.unsplash.com/photo-1619767886558-efdc7b9e0473",
      count: 0,
    },
    {
      name: "Luxury",
      slug: "luxury",
      description: "Luxury Vehicles",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      count: 0,
    },
  ];

  await supabase.from("vehicle_categories").upsert(categories);

  // Insert brands
  const brands = [
    {
      name: "BMW",
      slug: "bmw",
      logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-blue-white.png",
      description: "Luxury German automotive manufacturer",
      count: 0,
    },
    {
      name: "Mercedes-Benz",
      slug: "mercedes-benz",
      logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011.png",
      description: "Premium German automotive manufacturer",
      count: 0,
    },
    {
      name: "Audi",
      slug: "audi",
      logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
      description: "Luxury German automotive brand",
      count: 0,
    },
    {
      name: "Toyota",
      slug: "toyota",
      logo: "https://www.carlogos.org/car-logos/toyota-logo-2020-europe.png",
      description: "Japanese automotive manufacturer",
      count: 0,
    },
  ];

  await supabase.from("vehicle_brands").upsert(brands);

  // Insert sample vehicles
  const vehicles = [
    {
      title: "2024 BMW 3 Series M Sport",
      make: "BMW",
      model: "3 Series",
      year: 2024,
      price: 45000,
      mileage: 0,
      fuel_type: "Hybrid",
      transmission: "Automatic",
      body_type: "Sedan",
      color: "Alpine White",
      description:
        "Brand new BMW 3 Series with the latest technology and features.",
      features: [
        "LED Headlights",
        "Leather Interior",
        "Navigation System",
        "Parking Sensors",
      ],
      main_image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e"],
      status: "active",
      condition: "new",
      location: "London, UK",
    },
    {
      title: "2023 Mercedes-Benz C-Class",
      make: "Mercedes-Benz",
      model: "C-Class",
      year: 2023,
      price: 52000,
      mileage: 5000,
      fuel_type: "Petrol",
      transmission: "Automatic",
      body_type: "Sedan",
      color: "Obsidian Black",
      description:
        "Elegant C-Class with premium features and excellent condition.",
      features: [
        "Panoramic Roof",
        "Premium Sound System",
        "360 Camera",
        "Heated Seats",
      ],
      main_image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d"],
      status: "active",
      condition: "used",
      location: "Manchester, UK",
    },
  ];

  await supabase.from("vehicles").upsert(vehicles);
}
