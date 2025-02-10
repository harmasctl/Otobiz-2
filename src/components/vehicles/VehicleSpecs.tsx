import {
  Car,
  DoorOpen,
  Fuel,
  Gauge,
  Info,
  Palette,
  Settings2,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VehicleSpecsProps {
  specs: {
    year: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    engineSize: string;
    bodyType?: string;
    doors?: number;
    color?: string;
    previousOwners?: number;
    horsepower?: number;
  };
}

export default function VehicleSpecs({ specs }: VehicleSpecsProps) {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            icon: Gauge,
            label: "Mileage",
            value: `${specs.mileage.toLocaleString()} mi`,
            tooltip: "Total mileage of the vehicle",
          },
          {
            icon: Fuel,
            label: "Fuel Type",
            value: specs.fuelType,
            tooltip: "Type of fuel the vehicle uses",
          },
          {
            icon: Settings2,
            label: "Transmission",
            value: specs.transmission,
            tooltip: "Vehicle transmission type",
          },
          {
            icon: Car,
            label: "Engine Size",
            value: specs.engineSize,
            tooltip: `${specs.horsepower}hp engine capacity`,
          },
          specs.bodyType && {
            icon: Car,
            label: "Body Type",
            value: specs.bodyType,
            tooltip: "Vehicle body style",
          },
          specs.doors && {
            icon: DoorOpen,
            label: "Doors",
            value: `${specs.doors} doors`,
            tooltip: "Number of doors",
          },
          specs.color && {
            icon: Palette,
            label: "Color",
            value: specs.color,
            tooltip: "Exterior color",
          },
          specs.previousOwners !== undefined && {
            icon: Users,
            label: "Previous Owners",
            value: specs.previousOwners,
            tooltip: "Number of previous owners",
          },
        ]
          .filter(Boolean)
          .map((spec, index) => (
            <Tooltip key={index}>
              <TooltipTrigger>
                <div className="flex flex-col p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{spec.label}</div>
                  <div className="text-base font-medium">{spec.value}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{spec.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
      </div>
    </TooltipProvider>
  );
}
