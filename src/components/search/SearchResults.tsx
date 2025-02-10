import { useState } from "react";
import VehicleCard from "../vehicles/VehicleCard";
import VehicleFilters from "../vehicles/VehicleFilters";
import VehicleDetails from "../vehicles/VehicleDetails";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/types/vehicle";

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    make: "BMW",
    model: "3 Series",
    year: 2024,
    price: 45000,
    monthlyPrice: 599,
    mileage: 0,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "2.0L",
    horsepower: 258,
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
    ],
    features: [
      "Leather Seats",
      "Navigation System",
      "Bluetooth",
      "Parking Sensors",
      "Heated Seats",
      "360 Camera",
    ],
    description:
      "Brand new BMW 3 Series with the latest technology and features.",
    sellerId: "1",
    location: "Dakar, Senegal",
    status: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more mock vehicles here
];

export default function SearchResults() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-600">
            Found 234 vehicles matching your criteria
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select className="border rounded-md px-3 py-2">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
          <div className="flex gap-2">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("grid")}
            >
              ⊞
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("list")}
            >
              ≡
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
        <aside>
          <VehicleFilters />
        </aside>

        <main>
          <div
            className={`grid gap-6 ${view === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
          >
            {mockVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
                className="cursor-pointer"
              >
                <VehicleCard
                  id={vehicle.id}
                  make={vehicle.make}
                  model={vehicle.model}
                  year={vehicle.year}
                  monthlyPrice={vehicle.monthlyPrice}
                  mileage={vehicle.mileage}
                  image={vehicle.images[0]}
                  location={vehicle.location}
                />
              </div>
            ))}
          </div>
        </main>
      </div>

      {selectedVehicle && (
        <VehicleDetails
          vehicle={selectedVehicle}
          isOpen={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  );
}
