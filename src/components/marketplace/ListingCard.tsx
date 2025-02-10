import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, MapPin } from "lucide-react";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  specs: {
    year: number;
    mileage: number;
    transmission: string;
    fuelType: string;
  };
}

export default function ListingCard({
  id,
  title,
  price,
  location,
  image,
  specs,
}: ListingCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity z-10" />

        {/* Action buttons */}
        <div className="absolute right-3 top-3 z-20 flex gap-2">
          <Button size="icon" variant="secondary" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Image */}
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Quick action overlay */}
        <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity z-20 p-4">
          <Button className="w-full">View Details</Button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-bold">£{price.toLocaleString()}</div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
          <div>Year: {specs.year}</div>
          <div>{specs.mileage.toLocaleString()} miles</div>
          <div>{specs.transmission}</div>
          <div>{specs.fuelType}</div>
        </div>
      </div>
    </Card>
  );
}
