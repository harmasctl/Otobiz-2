import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, Star, Trophy, Zap } from "lucide-react";

interface BoostOption {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  icon: React.ElementType;
}

const boostOptions: BoostOption[] = [
  {
    id: "highlight",
    name: "Highlight",
    price: 9.99,
    duration: 7,
    features: [
      "Highlighted in search results",
      "Colored background",
      "Stand out from regular listings",
    ],
    icon: Star,
  },
  {
    id: "featured",
    name: "Featured",
    price: 19.99,
    duration: 14,
    features: [
      "Top of search results",
      "Highlighted listing",
      "Priority in similar listings",
      "Featured badge",
    ],
    icon: Trophy,
  },
  {
    id: "premium",
    name: "Premium",
    price: 49.99,
    duration: 30,
    features: [
      "Homepage showcase",
      "Top of search results",
      "Premium badge",
      "Social media promotion",
      "Featured in newsletter",
    ],
    icon: Rocket,
  },
  {
    id: "urgent",
    name: "Urgent Sale",
    price: 29.99,
    duration: 7,
    features: [
      "Urgent sale badge",
      "Priority in search",
      "Featured in urgent sales section",
      "Daily bump to top",
    ],
    icon: Zap,
  },
];

export default function ListingBoostOptions() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Boost Your Listing</h2>
        <p className="text-gray-600">
          Increase visibility and sell faster with our promotion options
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {boostOptions.map((option) => (
          <Card key={option.id} className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <option.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="font-semibold mb-2">{option.name}</h3>
              <div className="text-2xl font-bold mb-2">£{option.price}</div>
              <p className="text-sm text-gray-600 mb-4">
                {option.duration} days
              </p>

              <div className="space-y-2 text-sm text-left mb-6">
                {option.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full">Select {option.name}</Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-gray-600">
        * Boost options can be cancelled at any time. Refunds are prorated based
        on unused time.
      </div>
    </div>
  );
}
