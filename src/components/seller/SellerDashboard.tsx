import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, DollarSign, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SellerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Seller Dashboard</h2>
          <p className="text-gray-600">
            Manage your vehicle listings and sales
          </p>
        </div>
        <Button onClick={() => navigate("/sell")}>Add New Vehicle</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-gray-600">Active Listings</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">£24,500</div>
              <div className="text-sm text-gray-600">Total Sales</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-gray-600">Inquiries</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Listings</h3>
          {/* Add recent listings table */}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Inquiries</h3>
          {/* Add recent inquiries list */}
        </Card>
      </div>
    </div>
  );
}
