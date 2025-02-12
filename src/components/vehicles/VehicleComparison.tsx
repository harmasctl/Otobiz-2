import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: string;
  power: string;
  acceleration: string;
  fuelConsumption: string;
  co2Emissions: string;
  features: string[];
  image: string;
}

interface VehicleComparisonProps {
  vehicles: Vehicle[];
}

export default function VehicleComparison({
  vehicles,
}: VehicleComparisonProps) {
  const allFeatures = Array.from(
    new Set(vehicles.flatMap((vehicle) => vehicle.features)),
  ).sort();

  return (
    <ScrollArea className="w-full">
      <div className="space-y-8">
        {/* Header */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr)`,
          }}
        >
          <div></div>
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="p-4 text-center">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-1">
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-sm text-gray-600">{vehicle.year}</p>
            </Card>
          ))}
        </div>

        {/* Basic Specs */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr)`,
          }}
        >
          <div className="p-4 font-semibold">Basic Specs</div>
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="p-4 space-y-4">
              <div>
                <div className="text-sm text-gray-600">Price</div>
                <div className="font-semibold">
                  £{vehicle.price.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Mileage</div>
                <div className="font-semibold">
                  {vehicle.mileage.toLocaleString()} mi
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Fuel Type</div>
                <div className="font-semibold">{vehicle.fuelType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Transmission</div>
                <div className="font-semibold">{vehicle.transmission}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Performance */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr)`,
          }}
        >
          <div className="p-4 font-semibold">Performance</div>
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="p-4 space-y-4">
              <div>
                <div className="text-sm text-gray-600">Engine Size</div>
                <div className="font-semibold">{vehicle.engineSize}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Power Output</div>
                <div className="font-semibold">{vehicle.power}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">0-60 mph</div>
                <div className="font-semibold">{vehicle.acceleration}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Economy & Environment */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr)`,
          }}
        >
          <div className="p-4 font-semibold">Economy & Environment</div>
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="p-4 space-y-4">
              <div>
                <div className="text-sm text-gray-600">Fuel Consumption</div>
                <div className="font-semibold">{vehicle.fuelConsumption}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">CO2 Emissions</div>
                <div className="font-semibold">{vehicle.co2Emissions}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr)`,
          }}
        >
          <div className="p-4 font-semibold">Features</div>
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="p-4">
              <div className="space-y-2">
                {allFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    {vehicle.features.includes(feature) ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
