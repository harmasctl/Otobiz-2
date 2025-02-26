import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function PopularBrands() {
  const brands = [
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
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
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
  );
}
