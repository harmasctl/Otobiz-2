import { Card } from "@/components/ui/card";
import VehicleCardSimple from "./VehicleCardSimple";
import { useVehicleStore } from "@/store/useVehicleStore";

export default function SimilarVehicles() {
  const { vehicles } = useVehicleStore();

  // Get 4 similar vehicles
  const similarVehicles = vehicles.slice(0, 4);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Similar Vehicles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarVehicles.map((vehicle) => (
          <VehicleCardSimple
            key={vehicle.id}
            id={vehicle.id}
            title={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
            price={vehicle.price}
            monthlyPayment={vehicle.monthlyPayment}
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
    </Card>
  );
}
