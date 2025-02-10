import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface CompareVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: {
    cash?: number;
    monthly?: {
      amount: number;
      deposit: number;
      term: number;
    };
  };
  image: string;
  fuelType?: string;
  transmission?: string;
  engineSize?: string;
  mileage: number;
  bodyType?: string;
  doors?: number;
  color?: string;
  previousOwners?: number;
}

interface CompareVehiclesProps {
  vehicles: CompareVehicle[];
  onClose: () => void;
}

interface Feature {
  id: keyof CompareVehicle;
  label: string;
}

const features: Feature[] = [
  { id: "price", label: "Price" },
  { id: "mileage", label: "Mileage" },
  { id: "year", label: "Year" },
  { id: "fuelType", label: "Fuel Type" },
  { id: "transmission", label: "Transmission" },
  { id: "engineSize", label: "Engine Size" },
  { id: "bodyType", label: "Body Type" },
  { id: "doors", label: "Doors" },
  { id: "color", label: "Color" },
  { id: "previousOwners", label: "Previous Owners" },
];

export default function CompareVehicles({
  vehicles,
  onClose,
}: CompareVehiclesProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "price",
    "mileage",
    "year",
    "fuelType",
    "transmission",
  ]);

  const formatValue = (
    vehicle: CompareVehicle,
    feature: keyof CompareVehicle,
  ) => {
    const value = vehicle[feature];
    if (feature === "price") {
      return `£${vehicle.price.cash?.toLocaleString()}`;
    }
    if (feature === "mileage") {
      return `${value?.toLocaleString()} mi`;
    }
    return value;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={onClose}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Compare
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-[200px,1fr] gap-6">
          {/* Features selector */}
          <div className="space-y-4">
            <h3 className="font-medium mb-2">Compare Features</h3>
            {features.map((feature) => (
              <label
                key={feature.id}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <Checkbox
                  checked={selectedFeatures.includes(feature.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedFeatures([...selectedFeatures, feature.id]);
                    } else {
                      setSelectedFeatures(
                        selectedFeatures.filter((f) => f !== feature.id),
                      );
                    }
                  }}
                />
                <span>{feature.label}</span>
              </label>
            ))}
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto">
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${vehicles.length}, minmax(250px, 1fr))`,
              }}
            >
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="space-y-6">
                  <div className="aspect-[16/9] rounded-lg overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-600">{vehicle.year}</p>
                  </div>
                  <div className="space-y-4">
                    {selectedFeatures.map((featureId) => {
                      const feature = features.find((f) => f.id === featureId);
                      if (!feature) return null;
                      return (
                        <div key={featureId} className="text-sm">
                          <div className="text-gray-600 mb-1">
                            {feature.label}
                          </div>
                          <div className="font-medium">
                            {formatValue(
                              vehicle,
                              feature.id as keyof CompareVehicle,
                            ) || "-"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
