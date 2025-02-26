import { useParams } from "react-router-dom";
import VehicleGallery from "@/components/vehicles/VehicleGallery";
import VehicleInfo from "@/components/vehicles/VehicleInfo";
import VehicleSpecs from "@/components/vehicles/VehicleSpecs";
import VehicleFeatures from "@/components/vehicles/VehicleFeatures";
import VehicleFinanceCalculator from "@/components/vehicles/VehicleFinanceCalculator";
import SimilarVehicles from "@/components/vehicles/SimilarVehicles";
import ContactSeller from "@/components/vehicles/ContactSeller";

export default function VehicleDetails() {
  const { id } = useParams();

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[2fr,1fr] gap-8">
        <div className="space-y-8">
          <VehicleGallery />
          <VehicleInfo />
          <VehicleSpecs />
          <VehicleFeatures />
          <SimilarVehicles />
        </div>
        <div className="space-y-8">
          <ContactSeller />
          <VehicleFinanceCalculator />
        </div>
      </div>
    </div>
  );
}
