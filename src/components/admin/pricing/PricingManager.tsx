import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  features: PlanFeature[];
  isPopular: boolean;
  trialDays: number;
  maxListings: number;
  boostCredits: number;
}

export default function PricingManager() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      name: "Basic",
      price: 29,
      interval: "monthly",
      features: [
        { id: "1", name: "Basic listings", included: true },
        { id: "2", name: "Email support", included: true },
        { id: "3", name: "Analytics", included: false },
      ],
      isPopular: false,
      trialDays: 14,
      maxListings: 5,
      boostCredits: 1,
    },
  ]);

  const addPlan = () => {
    const newPlan: Plan = {
      id: Date.now().toString(),
      name: "New Plan",
      price: 0,
      interval: "monthly",
      features: [],
      isPopular: false,
      trialDays: 14,
      maxListings: 10,
      boostCredits: 0,
    };
    setPlans([...plans, newPlan]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Pricing Plans</h2>
          <p className="text-gray-600">
            Configure subscription plans and features
          </p>
        </div>
        <Button onClick={addPlan}>
          <Plus className="w-4 h-4 mr-2" />
          Add Plan
        </Button>
      </div>

      <div className="grid gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <Label>Plan Name</Label>
                    <Input
                      value={plan.name}
                      onChange={(e) => {
                        const updatedPlans = plans.map((p) =>
                          p.id === plan.id ? { ...p, name: e.target.value } : p,
                        );
                        setPlans(updatedPlans);
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price</Label>
                      <Input
                        type="number"
                        value={plan.price}
                        onChange={(e) => {
                          const updatedPlans = plans.map((p) =>
                            p.id === plan.id
                              ? { ...p, price: Number(e.target.value) }
                              : p,
                          );
                          setPlans(updatedPlans);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Trial Days</Label>
                      <Input
                        type="number"
                        value={plan.trialDays}
                        onChange={(e) => {
                          const updatedPlans = plans.map((p) =>
                            p.id === plan.id
                              ? { ...p, trialDays: Number(e.target.value) }
                              : p,
                          );
                          setPlans(updatedPlans);
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Max Listings</Label>
                      <Input
                        type="number"
                        value={plan.maxListings}
                        onChange={(e) => {
                          const updatedPlans = plans.map((p) =>
                            p.id === plan.id
                              ? { ...p, maxListings: Number(e.target.value) }
                              : p,
                          );
                          setPlans(updatedPlans);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Boost Credits</Label>
                      <Input
                        type="number"
                        value={plan.boostCredits}
                        onChange={(e) => {
                          const updatedPlans = plans.map((p) =>
                            p.id === plan.id
                              ? { ...p, boostCredits: Number(e.target.value) }
                              : p,
                          );
                          setPlans(updatedPlans);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={plan.isPopular}
                        onCheckedChange={(checked) => {
                          const updatedPlans = plans.map((p) =>
                            p.id === plan.id ? { ...p, isPopular: checked } : p,
                          );
                          setPlans(updatedPlans);
                        }}
                      />
                      <Label>Popular Plan</Label>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => {
                    const updatedPlans = plans.filter((p) => p.id !== plan.id);
                    setPlans(updatedPlans);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label className="mb-2 block">Features</Label>
                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature.id} className="flex items-center gap-2">
                      <Switch
                        checked={feature.included}
                        onCheckedChange={(checked) => {
                          const updatedPlans = plans.map((p) => {
                            if (p.id === plan.id) {
                              const updatedFeatures = p.features.map((f) =>
                                f.id === feature.id
                                  ? { ...f, included: checked }
                                  : f,
                              );
                              return { ...p, features: updatedFeatures };
                            }
                            return p;
                          });
                          setPlans(updatedPlans);
                        }}
                      />
                      <Input
                        value={feature.name}
                        onChange={(e) => {
                          const updatedPlans = plans.map((p) => {
                            if (p.id === plan.id) {
                              const updatedFeatures = p.features.map((f) =>
                                f.id === feature.id
                                  ? { ...f, name: e.target.value }
                                  : f,
                              );
                              return { ...p, features: updatedFeatures };
                            }
                            return p;
                          });
                          setPlans(updatedPlans);
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          const updatedPlans = plans.map((p) => {
                            if (p.id === plan.id) {
                              const updatedFeatures = p.features.filter(
                                (f) => f.id !== feature.id,
                              );
                              return { ...p, features: updatedFeatures };
                            }
                            return p;
                          });
                          setPlans(updatedPlans);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const updatedPlans = plans.map((p) => {
                        if (p.id === plan.id) {
                          const newFeature = {
                            id: Date.now().toString(),
                            name: "New Feature",
                            included: true,
                          };
                          return {
                            ...p,
                            features: [...p.features, newFeature],
                          };
                        }
                        return p;
                      });
                      setPlans(updatedPlans);
                    }}
                  >
                    Add Feature
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
