import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Share2,
  MessageCircle,
  Scale,
  MapPin,
  Fuel,
  Gauge,
  Settings2,
  Calendar,
  Car,
  Banknote,
  Clock,
  Info,
  DoorOpen,
  Palette,
  Users,
  FileText,
} from "lucide-react";
import WishlistButton from "./WishlistButton";

interface PriceInfo {
  cash?: number;
  monthly?: {
    amount: number;
    deposit: number;
    term: number;
  };
  lease?: {
    amount: number;
    deposit: number;
    term: number;
  };
}

interface VehicleCardProps {
  id: string;
  make: string;
  model: string;
  year: number;
  price: PriceInfo;
  mileage: number;
  image: string;
  location?: string;
  fuelType?: string;
  transmission?: string;
  engineSize?: string;
  condition?: string;
  bodyType?: string;
  doors?: number;
  color?: string;
  previousOwners?: number;
  serviceHistory?: boolean;
  registration?: string;
  onCompare?: () => void;
  onChat?: () => void;
}

export default function VehicleCard({
  id,
  make,
  model,
  year,
  price,
  mileage,
  image,
  location,
  fuelType,
  transmission,
  engineSize,
  condition = "Used",
  bodyType,
  doors,
  color,
  previousOwners,
  serviceHistory,
  registration,
  onCompare,
  onChat,
}: VehicleCardProps) {
  const navigate = useNavigate();
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity z-10" />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
          <Badge
            variant={condition === "New" ? "default" : "secondary"}
            className="font-semibold"
          >
            {condition}
          </Badge>
          {serviceHistory && (
            <Badge variant="secondary" className="font-semibold">
              Full Service History
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute right-3 top-3 z-20 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <WishlistButton
            vehicleId={id}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Image */}
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={image}
            alt={`${make} ${model}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Quick action overlay */}
        <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity z-20 p-4">
          <Button
            className="w-full bg-white/90 hover:bg-white text-black backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/vehicles/${id}`);
            }}
          >
            View Details
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg">{`${make} ${model} ${year}`}</h3>
          {location && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {location}
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="mb-4 space-y-2">
          {price.cash && (
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-gray-500" />
              <div className="text-2xl font-bold">
                £{price.cash.toLocaleString()}
              </div>
            </div>
          )}
          {price.monthly && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>£{price.monthly.amount}/mo</span>
              <span className="text-xs">({price.monthly.term} months)</span>
            </div>
          )}
        </div>

        {/* Vehicle Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Gauge className="h-4 w-4" />
            <span>{mileage.toLocaleString()} mi</span>
          </div>
          {fuelType && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Fuel className="h-4 w-4" />
              <span>{fuelType}</span>
            </div>
          )}
          {transmission && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Settings2 className="h-4 w-4" />
              <span>{transmission}</span>
            </div>
          )}
          {bodyType && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Car className="h-4 w-4" />
              <span>{bodyType}</span>
            </div>
          )}
          {doors && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DoorOpen className="h-4 w-4" />
              <span>{doors} Doors</span>
            </div>
          )}
          {color && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Palette className="h-4 w-4" />
              <span>{color}</span>
            </div>
          )}
          {previousOwners !== undefined && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>
                {previousOwners} {previousOwners === 1 ? "Owner" : "Owners"}
              </span>
            </div>
          )}
          {registration && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="h-4 w-4" />
              <span>{registration}</span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onCompare?.();
              }}
            >
              <Scale className="h-4 w-4" />
              Compare
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onChat?.();
              }}
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
