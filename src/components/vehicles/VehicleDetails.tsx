import { Button } from "@/components/ui/button";
import { Vehicle } from "@/types/vehicle";
import {
  MapPin,
  Share2,
  MessageCircle,
  Scale,
  Phone,
  ArrowLeft,
  Calendar,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VehicleGallery from "./VehicleGallery";
import VehicleSpecs from "./VehicleSpecs";
import YouMayAlsoLike from "./YouMayAlsoLike";
import { useNavigate } from "react-router-dom";
import Calculator from "../finance/Calculator";
import { useState } from "react";
import ChatDrawer from "../chat/ChatDrawer";

interface VehicleDetailsProps {
  vehicle: Vehicle;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
        text: `Check out this ${vehicle.make} ${vehicle.model} on Otobiz`,
        url: window.location.href,
      });
    } else {
      setShowShareDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl mx-auto py-8">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>

        {/* Main Info */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 mb-8">
          {/* Images */}
          <VehicleGallery
            images={vehicle.images}
            make={vehicle.make}
            model={vehicle.model}
          />

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">
                    {vehicle.make} {vehicle.model}
                  </h1>
                  <Badge variant="secondary">{vehicle.year}</Badge>
                </div>
                <Badge
                  variant="default"
                  className="bg-gradient-to-r from-amber-500 to-orange-500"
                >
                  PRO
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                {vehicle.location}
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg border space-y-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold tracking-tight">
                  £{vehicle.price.toLocaleString()}
                </div>
                {vehicle.monthlyPrice && (
                  <div className="text-xl text-gray-600">
                    £{vehicle.monthlyPrice}/month
                  </div>
                )}
              </div>

              <VehicleSpecs
                specs={{
                  year: vehicle.year,
                  mileage: vehicle.mileage,
                  fuelType: vehicle.fuelType,
                  transmission: vehicle.transmission,
                  engineSize: vehicle.engineSize,
                  horsepower: vehicle.horsepower,
                }}
              />

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setShowChat(true)}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Seller
                </Button>
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Scale className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowInfoDialog(true)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>

              <div className="pt-4 border-t space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Listed {new Date(vehicle.createdAt).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">
                  Reference: #{vehicle.id}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="overview"
          className="bg-white rounded-lg border p-6"
        >
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Description</h3>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {vehicle.description}
                </p>
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-700 font-medium mb-2">
                    <span className="text-lg">✨</span>
                    Pro Seller Benefits
                  </div>
                  <ul className="list-disc list-inside text-sm text-amber-600 space-y-1">
                    <li>Verified dealer with premium status</li>
                    <li>Extended warranty available</li>
                    <li>Professional inspection report</li>
                    <li>Flexible financing options</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Engine Size", value: vehicle.engineSize },
                  { label: "Horsepower", value: `${vehicle.horsepower} hp` },
                  { label: "Transmission", value: vehicle.transmission },
                  { label: "Fuel Type", value: vehicle.fuelType },
                  {
                    label: "Mileage",
                    value: `${vehicle.mileage.toLocaleString()} mi`,
                  },
                  { label: "Year", value: vehicle.year },
                ].map((spec, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      {spec.label}
                    </div>
                    <div className="font-medium">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {vehicle.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-green-500">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="finance">
            <Calculator />
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-medium mb-1">Clean History Record</h4>
                  <p className="text-sm text-gray-600">
                    This vehicle has no reported accidents or damage.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-medium mb-1">Full Service History</h4>
                  <p className="text-sm text-gray-600">
                    Complete maintenance records available.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Similar Vehicles */}
        <div className="mt-8">
          <YouMayAlsoLike
            currentVehicleId={vehicle.id}
            make={vehicle.make}
            priceRange={[vehicle.price * 0.8, vehicle.price * 1.2]}
          />
        </div>
      </div>

      {/* Chat Drawer */}
      {showChat && (
        <ChatDrawer
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          sellerId={vehicle.sellerId}
          vehicleId={vehicle.id}
          vehicleTitle={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
        />
      )}

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Share this vehicle</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                    "_blank",
                  )
                }
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${window.location.href}`,
                    "_blank",
                  )
                }
              >
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      `Check out this ${vehicle.make} ${vehicle.model} on Otobiz: ${window.location.href}`,
                    )}`,
                    "_blank",
                  )
                }
              >
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShowShareDialog(false);
                }}
              >
                Copy Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vehicle Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <Badge>{vehicle.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Listed</span>
                <span>{new Date(vehicle.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span>{new Date(vehicle.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reference</span>
                <span>#{vehicle.id}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
