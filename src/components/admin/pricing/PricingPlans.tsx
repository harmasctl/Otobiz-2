import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  description: string;
  features: string[];
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 29,
    interval: "monthly",
    description: "Perfect for individual sellers",
    features: [
      "Up to 5 listings",
      "Basic analytics",
      "Standard support",
      "30 days listing duration",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    price: 99,
    interval: "monthly",
    description: "Ideal for dealerships",
    features: [
      "Unlimited listings",
      "Advanced analytics",
      "Priority support",
      "Featured listings",
      "60 days listing duration",
      "Custom branding",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 299,
    interval: "monthly",
    description: "For large dealership networks",
    features: [
      "Unlimited listings",
      "Premium analytics",
      "24/7 support",
      "Featured listings",
      "90 days listing duration",
      "Custom branding",
      "API access",
      "Multiple locations",
    ],
  },
];

export default function PricingPlans() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your business needs. All plans include
          access to our basic features and can be upgraded or downgraded at any
          time.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`p-6 ${plan.highlighted ? "border-primary ring-2 ring-primary/20" : ""}`}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="text-3xl font-bold">
                £{plan.price}
                <span className="text-sm font-normal text-gray-600">
                  /{plan.interval}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              variant={plan.highlighted ? "default" : "outline"}
            >
              Choose {plan.name}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12 text-sm text-gray-600">
        Looking for custom solutions?{" "}
        <Button variant="link">Contact our sales team</Button>
      </div>
    </div>
  );
}
