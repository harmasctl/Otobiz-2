import { Card } from "@/components/ui/card";

interface AnalyticsData {
  totalUsers: number;
  activeListings: number;
  monthlyRevenue: number;
  conversionRate: number;
}

const mockData: AnalyticsData = {
  totalUsers: 12345,
  activeListings: 4567,
  monthlyRevenue: 98765,
  conversionRate: 2.8,
};

export default function AnalyticsChart() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <select className="border rounded-md px-3 py-2">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-sm text-gray-600">Total Users</div>
          <div className="text-3xl font-bold mt-2">
            {mockData.totalUsers.toLocaleString()}
          </div>
          <div className="text-sm text-green-600 mt-2">
            ↑ 12% from last month
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600">Active Listings</div>
          <div className="text-3xl font-bold mt-2">
            {mockData.activeListings.toLocaleString()}
          </div>
          <div className="text-sm text-green-600 mt-2">
            ↑ 8% from last month
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600">Monthly Revenue</div>
          <div className="text-3xl font-bold mt-2">
            £{mockData.monthlyRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-green-600 mt-2">
            ↑ 15% from last month
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600">Conversion Rate</div>
          <div className="text-3xl font-bold mt-2">
            {mockData.conversionRate}%
          </div>
          <div className="text-sm text-red-600 mt-2">↓ 2% from last month</div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          Chart placeholder - Integration with chart library needed
        </div>
      </Card>
    </div>
  );
}
