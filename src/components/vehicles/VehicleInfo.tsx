import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Eye, Heart } from "lucide-react";

export default function VehicleInfo() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">2024 BMW 3 Series M Sport</h1>
            <Badge>New</Badge>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              London, UK
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Listed 2 days ago
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              234 views
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold mb-1">£45,000</div>
          <div className="text-gray-600">£599/month</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button className="flex-1">Contact Seller</Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Heart className="w-4 h-4" /> Save
        </Button>
      </div>
    </Card>
  );
}
