import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAnalyticsStore } from "@/store/useAnalyticsStore";
import AnalyticsChart from "./AnalyticsChart";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import { useRealtimeAnalytics } from "@/hooks/useRealtimeAnalytics";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";

export default function Dashboard() {
  useRealtimeAnalytics();
  const { revenue, users, listings, loading, fetchAnalytics } =
    useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const mockChartData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to your admin dashboard</p>
        </div>
        <Button onClick={() => fetchAnalytics()}>Refresh Data</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <h3 className="text-2xl font-bold">
                £{revenue.monthly.toLocaleString()}
              </h3>
            </div>
            <div className="flex items-center text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm">12%</span>
            </div>
          </div>
          <AnalyticsChart data={mockChartData} color="#10B981" />
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <h3 className="text-2xl font-bold">
                {users.active.toLocaleString()}
              </h3>
            </div>
            <div className="flex items-center text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm">8%</span>
            </div>
          </div>
          <AnalyticsChart data={mockChartData} color="#6366F1" />
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600">Active Listings</p>
              <h3 className="text-2xl font-bold">
                {listings.active.toLocaleString()}
              </h3>
            </div>
            <div className="flex items-center text-red-600">
              <ArrowDownRight className="h-4 w-4" />
              <span className="text-sm">3%</span>
            </div>
          </div>
          <AnalyticsChart data={mockChartData} color="#F59E0B" />
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <h3 className="text-2xl font-bold">2.4%</h3>
            </div>
            <div className="flex items-center text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm">4%</span>
            </div>
          </div>
          <AnalyticsChart data={mockChartData} color="#EC4899" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
}
