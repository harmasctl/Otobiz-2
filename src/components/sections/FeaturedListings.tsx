import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import VehicleCardSimple from "../vehicles/VehicleCardSimple";

export default function FeaturedListings() {
  const featuredVehicles = [
    {
      id: "1",
      title: "2024 BMW 3 Series M Sport",
      price: 45000,
      location: "London, UK",
      year: 2024,
      mileage: 0,
      fuelType: "Hybrid",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      condition: "new",
    },
    {
      id: "2",
      title: "2023 Mercedes-Benz C-Class",
      price: 52000,
      location: "Manchester, UK",
      year: 2023,
      mileage: 5000,
      fuelType: "Petrol",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      condition: "used",
    },
    {
      id: "3",
      title: "2024 Audi A4 Avant",
      price: 48000,
      location: "Birmingham, UK",
      year: 2024,
      mileage: 1000,
      fuelType: "Diesel",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
      condition: "used",
    },
    {
      id: "4",
      title: "2024 Tesla Model 3",
      price: 42000,
      location: "Leeds, UK",
      year: 2024,
      mileage: 0,
      fuelType: "Electric",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1619767886558-efdc7b9e0473",
      condition: "new",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Listings</h2>
          <Button variant="outline" className="group">
            View All{" "}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VehicleCardSimple
                id={vehicle.id}
                title={vehicle.title}
                price={vehicle.price}
                location={vehicle.location}
                year={vehicle.year}
                mileage={vehicle.mileage}
                fuelType={vehicle.fuelType}
                transmission={vehicle.transmission}
                image={vehicle.image}
                isNew={vehicle.condition === "new"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
