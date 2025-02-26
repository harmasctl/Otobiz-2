import { useEffect } from "react";
import { useVehicleStore } from "@/store/useVehicleStore";
import VehicleCardSimple from "../vehicles/VehicleCardSimple";

export default function ListingsGrid() {
  const { vehicles, isLoading, fetchVehicles } = useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h3 className="text-lg font-semibold">No vehicles found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCardSimple
          key={vehicle.id}
          id={vehicle.id}
          title={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
          price={vehicle.price}
          location={vehicle.location}
          year={vehicle.year}
          mileage={vehicle.mileage}
          fuelType={vehicle.fuelType}
          transmission={vehicle.transmission}
          image={vehicle.mainImage}
          isNew={vehicle.condition === "new"}
        />
      ))}
    </div>
  );
}
