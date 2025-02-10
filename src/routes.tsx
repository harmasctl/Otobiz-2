import { Route, Routes, Navigate, useParams } from "react-router-dom";
import VehicleDetails from "./components/vehicles/VehicleDetails";
import Home from "./components/home";
import { Vehicle } from "./types/vehicle";

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    make: "BMW",
    model: "3 Series",
    year: 2024,
    price: 45000,
    monthlyPrice: 599,
    mileage: 0,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "2.0L",
    horsepower: 258,
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
    ],
    features: [
      "Leather Seats",
      "Navigation System",
      "Bluetooth",
      "Parking Sensors",
      "Heated Seats",
      "360 Camera",
    ],
    description:
      "Brand new BMW 3 Series with the latest technology and features.",
    sellerId: "1",
    location: "Dakar, Senegal",
    status: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function VehicleDetailsPage() {
  const { id } = useParams();
  const vehicle = mockVehicles.find((v) => v.id === id);

  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  return <VehicleDetails vehicle={vehicle} isOpen={true} onClose={() => {}} />;
}

import Search from "./pages/search";
import SellForm from "./components/vehicles/SellForm";
import Calculator from "./components/finance/Calculator";
import Dashboard from "./components/admin/Dashboard";
import { useApp } from "./context/AppContext";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useApp();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
      <Route path="/sell" element={<SellForm />} />
      <Route path="/finance" element={<Calculator />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
