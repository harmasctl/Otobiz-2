import { useParams } from "react-router-dom";
import { useVehicleStore } from "@/store/useVehicleStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  MessageCircle,
  Share2,
  Scale,
  Phone,
  ArrowLeft,
} from "lucide-react";
import VehicleGallery from "@/components/vehicles/VehicleGallery";
import VehicleSpecs from "@/components/vehicles/VehicleSpecs";
import VehicleFinanceCalculator from "@/components/vehicles/VehicleFinanceCalculator";
import YouMayAlsoLike from "@/components/vehicles/YouMayAlsoLike";

export default function VehicleDetails() {
  const { id } = useParams();
  const { vehicles, addToCompare, toggleSaved, savedVehicles } =
    useVehicleStore();
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) return <div>Loading...</div>;

  const isSaved = savedVehicles.includes(vehicle.id);

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
            </Button>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{vehicle.title}</h1>
              <Badge
                variant={vehicle.condition === "new" ? "default" : "secondary"}
              >
                {vehicle.condition}
              </Badge>
              {vehicle.boost && (
                <Badge
                  variant="default"
                  className="bg-gradient-to-r from-amber-500 to-orange-500"
                >
                  {vehicle.boost.type}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              {vehicle.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              £{vehicle.price.toLocaleString()}
            </div>
            {vehicle.monthlyPayment && (
              <div className="text-gray-600">
                £{vehicle.monthlyPayment.amount}/month
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <VehicleGallery images={vehicle.images} />

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-600">{vehicle.description}</p>
                </Card>
              </TabsContent>

              <TabsContent value="specs">
                <Card className="p-6">
                  <VehicleSpecs vehicle={vehicle} />
                </Card>
              </TabsContent>

              <TabsContent value="features">
                <Card className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vehicle.features?.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="finance">
                <Card className="p-6">
                  <VehicleFinanceCalculator vehiclePrice={vehicle.price} />
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" /> Message Seller
                  </Button>
                  <Button variant="outline" size="icon">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => addToCompare(vehicle)}
                  >
                    <Scale className="w-4 h-4 mr-2" /> Compare
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleSaved(vehicle.id)}
                  >
                    {isSaved ? "❤️" : "🤍"}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Seller Information</h3>
              {/* Add seller information */}
            </Card>
          </div>
        </div>

        {/* Similar Vehicles */}
        <YouMayAlsoLike
          currentVehicleId={vehicle.id}
          make={vehicle.make}
          priceRange={[vehicle.price * 0.8, vehicle.price * 1.2]}
        />
      </div>
    </div>
  );
}
