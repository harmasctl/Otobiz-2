import SearchHero from "./search/SearchHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Car, Shield, ThumbsUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import VehicleCardSimple from "./vehicles/VehicleCardSimple";
import CategoryBrowser from "./sections/CategoryBrowser";
import { motion } from "framer-motion";
import { useVehicleStore } from "@/store/useVehicleStore";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { vehicles, featuredVehicles } = useVehicleStore();

  return (
    <div className="min-h-screen">
      <SearchHero />

      {/* Featured Listings */}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryBrowser />

      {/* Popular Brands */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              {
                name: "BMW",
                logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-blue-white.png",
              },
              {
                name: "Mercedes",
                logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011.png",
              },
              {
                name: "Audi",
                logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
              },
              {
                name: "Toyota",
                logo: "https://www.carlogos.org/car-logos/toyota-logo-2020-europe.png",
              },
              {
                name: "Honda",
                logo: "https://www.carlogos.org/car-logos/honda-logo-2000.png",
              },
              {
                name: "Ford",
                logo: "https://www.carlogos.org/car-logos/ford-logo-2017.png",
              },
            ].map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 object-contain mb-4"
                  />
                  <h3 className="font-semibold text-center">{brand.name}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600">
              Simple steps to find your perfect vehicle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Search & Compare",
                description:
                  "Browse through our extensive collection of vehicles and compare your favorites",
                step: "1",
                icon: Car,
              },
              {
                title: "Connect & Verify",
                description:
                  "Connect with sellers, verify vehicle details, and schedule viewings",
                step: "2",
                icon: Shield,
              },
              {
                title: "Deal & Drive",
                description:
                  "Complete the transaction securely and drive away in your new vehicle",
                step: "3",
                icon: Award,
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#00853f] text-white flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <step.icon className="w-12 h-12 mx-auto mb-4 text-[#00853f]" />
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">
              Trusted by thousands of satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                role: "Car Buyer",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
                review:
                  "Found my dream car within a week. The process was smooth and transparent.",
                rating: 5,
              },
              {
                name: "Sarah Johnson",
                role: "Car Seller",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
                review:
                  "Sold my car quickly and for a great price. The platform is very user-friendly.",
                rating: 5,
              },
              {
                name: "Michael Brown",
                role: "Car Enthusiast",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
                review:
                  "Great selection of vehicles and helpful customer service. Highly recommended!",
                rating: 5,
              },
            ].map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-yellow-400 flex justify-center gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{review.review}"</p>
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-sm text-gray-600">{review.role}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Button variant="outline" className="group">
              View All News{" "}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Top Electric Vehicles for 2024",
                image:
                  "https://images.unsplash.com/photo-1619767886558-efdc7b9e0473",
                date: "Mar 15, 2024",
                category: "Electric Vehicles",
              },
              {
                title: "Car Maintenance Tips for Summer",
                image:
                  "https://images.unsplash.com/photo-1632823471565-1ec2f1741cd6",
                date: "Mar 10, 2024",
                category: "Maintenance",
              },
              {
                title: "Future of Autonomous Driving",
                image:
                  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
                date: "Mar 5, 2024",
                category: "Technology",
              },
            ].map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-sm text-gray-600">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-[#00853f] transition-colors">
                      {article.title}
                    </h3>
                    <Button
                      variant="link"
                      className="text-[#00853f] p-0 group/btn"
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
