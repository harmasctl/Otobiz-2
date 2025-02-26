import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function LatestNews() {
  const articles = [
    {
      title: "Top Electric Vehicles for 2024",
      image: "https://images.unsplash.com/photo-1619767886558-efdc7b9e0473",
      date: "Mar 15, 2024",
      category: "Electric Vehicles",
    },
    {
      title: "Car Maintenance Tips for Summer",
      image: "https://images.unsplash.com/photo-1632823471565-1ec2f1741cd6",
      date: "Mar 10, 2024",
      category: "Maintenance",
    },
    {
      title: "Future of Autonomous Driving",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
      date: "Mar 5, 2024",
      category: "Technology",
    },
  ];

  return (
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
          {articles.map((article, index) => (
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
  );
}
