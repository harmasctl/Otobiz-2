import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Rocket, Star, Trophy, Zap, Plus, Trash2 } from "lucide-react";

interface PricingRule {
  id: string;
  type: "fixed" | "percentage" | "tiered";
  value: number;
  minQuantity?: number;
  maxQuantity?: number;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  multiplier: number;
}

interface BoostOption {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  icon: "star" | "trophy" | "rocket" | "zap";
  isActive: boolean;
  pricingRules: PricingRule[];
  timeSlots: TimeSlot[];
  maxUsagePerUser?: number;
  minListingPrice?: number;
  maxListingPrice?: number;
  categoryRestrictions?: string[];
  locationRestrictions?: string[];
  startDate?: string;
  endDate?: string;
  totalUsageLimit?: number;
  currentUsage: number;
  analytics: {
    totalSales: number;
    activeBoosts: number;
    conversionRate: number;
    averageListingViews: number;
  };
}

export default function ListingBoostManager() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const [boostOptions, setBoostOptions] = useState<BoostOption[]>([
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
      icon: "star",
      isActive: true,
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
      icon: "trophy",
      isActive: true,
      pricingRules: [
        {
          id: "1",
          type: "fixed",
          value: 9.99,
        },
      ],
      timeSlots: [
        {
          id: "1",
          startTime: "09:00",
          endTime: "17:00",
          multiplier: 1,
        },
      ],
      maxUsagePerUser: 5,
      minListingPrice: 1000,
      maxListingPrice: 100000,
      currentUsage: 45,
      analytics: {
        totalSales: 1234,
        activeBoosts: 56,
        conversionRate: 0.15,
        averageListingViews: 234,
      },
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
      icon: "rocket",
      isActive: true,
      pricingRules: [
        {
          id: "1",
          type: "tiered",
          value: 49.99,
          minQuantity: 1,
          maxQuantity: 5,
        },
        {
          id: "2",
          type: "tiered",
          value: 44.99,
          minQuantity: 6,
          maxQuantity: 10,
        },
      ],
      timeSlots: [
        {
          id: "1",
          startTime: "09:00",
          endTime: "17:00",
          multiplier: 1,
        },
        {
          id: "2",
          startTime: "17:00",
          endTime: "23:00",
          multiplier: 1.5,
        },
      ],
      maxUsagePerUser: 10,
      minListingPrice: 5000,
      maxListingPrice: null,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      totalUsageLimit: 1000,
      currentUsage: 234,
      analytics: {
        totalSales: 5678,
        activeBoosts: 123,
        conversionRate: 0.25,
        averageListingViews: 456,
      },
    },
  ]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "star":
        return <Star className="h-6 w-6" />;
      case "trophy":
        return <Trophy className="h-6 w-6" />;
      case "rocket":
        return <Rocket className="h-6 w-6" />;
      case "zap":
        return <Zap className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  const addBoostOption = () => {
    const newOption: BoostOption = {
      id: Date.now().toString(),
      name: "New Boost Option",
      price: 0,
      duration: 7,
      features: [],
      icon: "star",
      isActive: true,
    };
    setBoostOptions([...boostOptions, newOption]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Listing Boost Options</h2>
          <p className="text-gray-600">
            Configure and manage listing promotion options
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            {showAnalytics ? "Hide Analytics" : "Show Analytics"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setBulkEditMode(!bulkEditMode)}
          >
            {bulkEditMode ? "Exit Bulk Edit" : "Bulk Edit"}
          </Button>
          <Button onClick={addBoostOption}>
            <Plus className="w-4 h-4 mr-2" />
            Add Option
          </Button>
        </div>
      </div>

      {showAnalytics && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
          <div className="grid grid-cols-4 gap-6">
            {boostOptions.map((option) => (
              <div key={option.id} className="space-y-2">
                <h4 className="font-medium">{option.name}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Total Sales:</div>
                  <div className="text-right">
                    {option.analytics.totalSales}
                  </div>
                  <div>Active Boosts:</div>
                  <div className="text-right">
                    {option.analytics.activeBoosts}
                  </div>
                  <div>Conversion Rate:</div>
                  <div className="text-right">
                    {(option.analytics.conversionRate * 100).toFixed(1)}%
                  </div>
                  <div>Avg. Views:</div>
                  <div className="text-right">
                    {option.analytics.averageListingViews}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {bulkEditMode && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Bulk Edit</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setSelectedOptions([])}>
                Deselect All
              </Button>
              <Button variant="outline">Update Selected</Button>
              <Button variant="destructive">Delete Selected</Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-6">
        {boostOptions.map((option) => (
          <Card key={option.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {getIcon(option.icon)}
                  </div>
                  <div className="space-y-1">
                    <Input
                      value={option.name}
                      onChange={(e) => {
                        const updated = boostOptions.map((o) =>
                          o.id === option.id
                            ? { ...o, name: e.target.value }
                            : o,
                        );
                        setBoostOptions(updated);
                      }}
                      className="text-lg font-semibold"
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={option.isActive}
                        onCheckedChange={(checked) => {
                          const updated = boostOptions.map((o) =>
                            o.id === option.id
                              ? { ...o, isActive: checked }
                              : o,
                          );
                          setBoostOptions(updated);
                        }}
                      />
                      <Label>Active</Label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price (£)</Label>
                    <Input
                      type="number"
                      value={option.price}
                      onChange={(e) => {
                        const updated = boostOptions.map((o) =>
                          o.id === option.id
                            ? { ...o, price: Number(e.target.value) }
                            : o,
                        );
                        setBoostOptions(updated);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (days)</Label>
                    <Input
                      type="number"
                      value={option.duration}
                      onChange={(e) => {
                        const updated = boostOptions.map((o) =>
                          o.id === option.id
                            ? { ...o, duration: Number(e.target.value) }
                            : o,
                        );
                        setBoostOptions(updated);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="space-y-2">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => {
                            const updated = boostOptions.map((o) => {
                              if (o.id === option.id) {
                                const updatedFeatures = [...o.features];
                                updatedFeatures[index] = e.target.value;
                                return { ...o, features: updatedFeatures };
                              }
                              return o;
                            });
                            setBoostOptions(updated);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => {
                            const updated = boostOptions.map((o) => {
                              if (o.id === option.id) {
                                const updatedFeatures = o.features.filter(
                                  (_, i) => i !== index,
                                );
                                return { ...o, features: updatedFeatures };
                              }
                              return o;
                            });
                            setBoostOptions(updated);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const updated = boostOptions.map((o) => {
                          if (o.id === option.id) {
                            return {
                              ...o,
                              features: [...o.features, "New Feature"],
                            };
                          }
                          return o;
                        });
                        setBoostOptions(updated);
                      }}
                    >
                      Add Feature
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600"
                onClick={() => {
                  const updated = boostOptions.filter(
                    (o) => o.id !== option.id,
                  );
                  setBoostOptions(updated);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
