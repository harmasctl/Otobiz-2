import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Car, Shield, Award } from "lucide-react";

export default function HowItWorks() {
  const steps = [
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
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">
            Simple steps to find your perfect vehicle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
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
  );
}
