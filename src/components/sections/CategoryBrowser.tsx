import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CategoryBrowser() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "suv",
      name: "SUV",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
      count: 234,
    },
    {
      id: "sedan",
      name: "Sedan",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      count: 156,
    },
    {
      id: "electric",
      name: "Electric",
      image: "https://images.unsplash.com/photo-1619767886558-efdc7b9e0473",
      count: 89,
    },
    {
      id: "luxury",
      name: "Luxury",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      count: 123,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Browse by Category</h2>
            <p className="text-gray-600">Find your perfect vehicle type</p>
          </div>
          <Button
            variant="link"
            className="text-[#00853f]"
            onClick={() => navigate("/marketplace")}
          >
            View all categories
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
              onClick={() => navigate(`/marketplace?category=${category.id}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-white">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm opacity-90">
                    {category.count} vehicles
                  </p>
                  <Button variant="link" className="text-white p-0 group">
                    View All
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
