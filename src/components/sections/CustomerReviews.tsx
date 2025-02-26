import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function CustomerReviews() {
  const reviews = [
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
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">
            Trusted by thousands of satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
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
  );
}
