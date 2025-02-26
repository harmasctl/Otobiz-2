import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function VehicleFeatures() {
  const features = [
    "LED Headlights",
    "Leather Interior",
    "Navigation System",
    "Parking Sensors",
    "Bluetooth",
    "Climate Control",
    "Cruise Control",
    "Alloy Wheels",
    "Heated Seats",
    "Backup Camera",
    "Keyless Entry",
    "Power Windows",
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Features & Equipment</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
