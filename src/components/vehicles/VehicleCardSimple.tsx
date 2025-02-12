import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Scale,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
} from "lucide-react";
import { Vehicle } from "@/types/vehicle";
import { useVehicleStore } from "@/store/useVehicleStore";
import { useNavigate } from "react-router-dom";

type VehicleCardSimpleProps = {
  id?: string;
  title: string;
  price: number;
  monthlyPayment?: {
    amount: number;
    months: number;
  };
  location: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  image: string;
  mainImage?: string;
  condition?: string;
  isNew?: boolean;
  onCompare?: () => void;
  onChat?: () => void;
};

export default function VehicleCardSimple({
  id,
  title,
  price,
  monthlyPayment,
  location,
  year,
  mileage,
  fuelType,
  transmission,
  mainImage,
  image,
  condition,
  isNew,
  onCompare,
  onChat,
}: VehicleCardSimpleProps) {
  const navigate = useNavigate();
  const { addToCompare, compareVehicles, toggleSaved, savedVehicles } =
    useVehicleStore();

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id) {
      addToCompare({
        id,
        title,
        price,
        monthlyPayment,
        location,
        year,
        mileage,
        fuelType,
        transmission,
        mainImage: mainImage || image,
        images: [mainImage || image],
        status: "available",
        condition: "used",
        sellerId: "",
        sellerType: "private",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        saves: 0,
      } as Vehicle);
    } else if (onCompare) {
      onCompare();
    }
  };

  const handleChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChat) onChat();
  };

  const handleClick = () => {
    if (id) navigate(`/vehicles/${id}`);
  };

  const isCompared = id ? compareVehicles.some((v) => v.id === id) : false;
  const isSaved = id ? savedVehicles.includes(id) : false;

  return (
    <Card
      className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={handleClick}
    >
      <div className="relative">
        {isNew && (
          <Badge className="absolute top-2 left-2 bg-black text-white">
            New
          </Badge>
        )}
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={mainImage || image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="text-sm text-gray-600">{location}</div>
          </div>

          <div>
            <div className="text-lg font-bold">£{price.toLocaleString()}</div>
            {monthlyPayment && (
              <div className="text-sm text-gray-600">
                £{monthlyPayment.amount}/mo ({monthlyPayment.months} months)
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              <span>{mileage.toLocaleString()} mi</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="h-4 w-4" />
              <span>{fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span>{transmission}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleCompare}
              >
                <Scale className="h-4 w-4" />
                Compare
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleChat}
              >
                <MessageCircle className="h-4 w-4" />
                Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
