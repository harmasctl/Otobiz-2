import { Card } from "@/components/ui/card";
import {
  Car,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Palette,
  MapPin,
} from "lucide-react";

interface VehicleSpecsProps {
  vehicle?: {
    make: string;
    model: string;
    year: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    bodyType?: string;
    color?: string;
    location?: string;
  };
}

export default function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  if (!vehicle) return null;

  const specs = [
    {
      icon: Car,
      label: "Make & Model",
      value: `${vehicle.make} ${vehicle.model}`,
    },
    {
      icon: Calendar,
      label: "Year",
      value: vehicle.year,
    },
    {
      icon: Gauge,
      label: "Mileage",
      value: `${vehicle.mileage.toLocaleString()} mi`,
    },
    {
      icon: Fuel,
      label: "Fuel Type",
      value: vehicle.fuelType,
    },
    {
      icon: Settings2,
      label: "Transmission",
      value: vehicle.transmission,
    },
    {
      icon: Car,
      label: "Body Type",
      value: vehicle.bodyType || "N/A",
    },
    {
      icon: Palette,
      label: "Color",
      value: vehicle.color || "N/A",
    },
    {
      icon: MapPin,
      label: "Location",
      value: vehicle.location || "N/A",
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Vehicle Specifications</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {specs.map((spec) => (
          <div key={spec.label} className="flex items-start gap-3">
            <spec.icon className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm text-gray-600">{spec.label}</div>
              <div className="font-medium">{spec.value}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
