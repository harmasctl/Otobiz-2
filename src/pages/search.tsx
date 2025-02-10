import { useState } from "react";
import { useApp } from "@/context/AppContext";
import VehicleCard from "@/components/vehicles/VehicleCard";
import VehicleFilters from "@/components/vehicles/VehicleFilters";
import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";
import CompareDrawer from "@/components/vehicles/CompareDrawer";
import CompareVehicles from "@/components/vehicles/CompareVehicles";

const mockVehicles = [
  {
    id: "1",
    make: "BMW",
    model: "3 Series M Sport",
    year: 2024,
    price: {
      cash: 39999,
      monthly: {
        amount: 399,
        deposit: 3999,
        term: 48,
      },
    },
    mileage: 0,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
    location: "Dakar, Senegal",
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "2.0L",
    bodyType: "Sedan",
    doors: 4,
    color: "Alpine White",
    previousOwners: 1,
  },
  {
    id: "2",
    make: "Mercedes",
    model: "A-Class AMG Line",
    year: 2024,
    price: {
      cash: 37999,
      monthly: {
        amount: 379,
        deposit: 3790,
        term: 48,
      },
    },
    mileage: 0,
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982",
    location: "Dakar, Senegal",
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "1.8L",
    bodyType: "Hatchback",
    doors: 5,
    color: "Cosmos Black",
    previousOwners: 0,
  },
];

export default function Search() {
  const {
    compareVehicles,
    setCompareVehicles,
    showCompareDrawer,
    setShowCompareDrawer,
    showCompareModal,
    setShowCompareModal,
  } = useApp();
  const [view, setView] = useState<"grid" | "list">("grid");

  const handleCompare = (vehicle: any) => {
    if (compareVehicles.length < 3) {
      setCompareVehicles([...compareVehicles, vehicle]);
      setShowCompareDrawer(true);
    }
  };

  const handleRemoveCompare = (id: string) => {
    setCompareVehicles(compareVehicles.filter((v) => v.id !== id));
    if (compareVehicles.length <= 1) {
      setShowCompareDrawer(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-600">
            Found {mockVehicles.length} vehicles matching your criteria
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
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
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
              <VehicleCard
                key={vehicle.id}
                {...vehicle}
                onCompare={() => handleCompare(vehicle)}
              />
            ))}
          </div>
        </main>
      </div>

      {showCompareDrawer && (
        <CompareDrawer
          vehicles={compareVehicles}
          onRemove={handleRemoveCompare}
          onClose={() => setShowCompareDrawer(false)}
          onCompare={() => {
            setShowCompareModal(true);
            setShowCompareDrawer(false);
          }}
        />
      )}

      {showCompareModal && (
        <CompareVehicles
          vehicles={compareVehicles}
          onClose={() => setShowCompareModal(false)}
        />
      )}
    </div>
  );
}
