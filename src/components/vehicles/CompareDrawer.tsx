import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface CompareDrawerProps {
  vehicles: CompareVehicle[];
  onRemove: (id: string) => void;
  onClose: () => void;
  onCompare: () => void;
}

export default function CompareDrawer({
  vehicles,
  onRemove,
  onClose,
  onCompare,
}: CompareDrawerProps) {
  const navigate = useNavigate();

  const handleAddVehicle = () => {
    navigate("/search");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-50 p-4">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Compare Vehicles</h3>
            <span className="text-sm text-gray-600">
              ({vehicles.length}/3 selected)
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => {
            const vehicle = vehicles[index];
            return (
              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50 relative min-h-[200px] transition-all duration-200"
              >
                {vehicle ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => onRemove(vehicle.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="aspect-[16/9] rounded-md overflow-hidden mb-4">
                      <img
                        src={vehicle.image}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-medium mb-2">
                      {vehicle.make} {vehicle.model} {vehicle.year}
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Price: £{vehicle.price.cash?.toLocaleString()}</div>
                      <div>Mileage: {vehicle.mileage.toLocaleString()} mi</div>
                      {vehicle.fuelType && <div>Fuel: {vehicle.fuelType}</div>}
                      {vehicle.transmission && (
                        <div>Transmission: {vehicle.transmission}</div>
                      )}
                      {vehicle.bodyType && <div>Body: {vehicle.bodyType}</div>}
                      {vehicle.doors && <div>Doors: {vehicle.doors}</div>}
                      {vehicle.color && <div>Color: {vehicle.color}</div>}
                      {vehicle.previousOwners !== undefined && (
                        <div>Previous Owners: {vehicle.previousOwners}</div>
                      )}
                    </div>
                  </>
                ) : (
                  <button
                    onClick={handleAddVehicle}
                    className="h-full w-full flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Plus className="h-8 w-8 mb-2" />
                    <span className="text-sm">Add a vehicle to compare</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={onCompare}
            disabled={vehicles.length < 2}
            className="flex items-center gap-2"
          >
            Compare Now
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
