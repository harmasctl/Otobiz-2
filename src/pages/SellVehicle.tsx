import VehicleForm from "@/components/vehicles/VehicleForm";

export default function SellVehicle() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">List Your Vehicle</h1>
        <VehicleForm />
      </div>
    </div>
  );
}
