import VehicleCard from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: {
    cash: number;
    monthly?: {
      amount: number;
      deposit: number;
      term: number;
    };
  };
  mileage: number;
  image: string;
  location: string;
  fuelType?: string;
  transmission?: string;
}

interface YouMayAlsoLikeProps {
  currentVehicleId: string;
  make: string;
  priceRange: [number, number];
}

const mockSimilarVehicles: Vehicle[] = [
  {
    id: "5",
    make: "BMW",
    model: "5 Series",
    year: 2024,
    price: {
      cash: 55000,
      monthly: {
        amount: 699,
        deposit: 5500,
        term: 48,
      },
    },
    mileage: 0,
    image: "https://images.unsplash.com/photo-1523983254932-c7e6571c9d60",
    location: "Dakar, Senegal",
    fuelType: "Hybrid",
    transmission: "Automatic",
  },
  {
    id: "6",
    make: "BMW",
    model: "X3",
    year: 2023,
    price: {
      cash: 48000,
      monthly: {
        amount: 649,
        deposit: 4800,
        term: 48,
      },
    },
    mileage: 5000,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
    location: "Dakar, Senegal",
    fuelType: "Petrol",
    transmission: "Automatic",
  },
  {
    id: "7",
    make: "BMW",
    model: "4 Series",
    year: 2024,
    price: {
      cash: 52000,
      monthly: {
        amount: 679,
        deposit: 5200,
        term: 48,
      },
    },
    mileage: 1000,
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b",
    location: "Dakar, Senegal",
    fuelType: "Petrol",
    transmission: "Automatic",
  },
];

export default function YouMayAlsoLike({
  currentVehicleId,
  make,
  priceRange,
}: YouMayAlsoLikeProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("similar-vehicles");
    if (!container) return;

    const scrollAmount = 300;
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(
            container.scrollWidth - container.clientWidth,
            scrollPosition + scrollAmount,
          );

    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">You May Also Like</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll("left")}
            disabled={scrollPosition === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        id="similar-vehicles"
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {mockSimilarVehicles
          .filter((vehicle) => vehicle.id !== currentVehicleId)
          .map((vehicle) => (
            <div key={vehicle.id} className="min-w-[300px] max-w-[300px]">
              <VehicleCard {...vehicle} />
            </div>
          ))}
      </div>
    </div>
  );
}
