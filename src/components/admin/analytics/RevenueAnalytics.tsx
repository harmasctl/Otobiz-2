import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowDown, ArrowUp, Download } from "lucide-react";
import PaymentAnalytics from "./PaymentAnalytics";

interface RevenueData {
  date: string;
  revenue: number;
  subscriptions: number;
  listings: number;
}

const mockData: RevenueData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    date: date.toISOString().split("T")[0],
    revenue: Math.floor(Math.random() * 10000) + 5000,
    subscriptions: Math.floor(Math.random() * 50) + 20,
    listings: Math.floor(Math.random() * 100) + 50,
  };
}).reverse();

export default function RevenueAnalytics() {
  const currentRevenue = mockData[mockData.length - 1].revenue;
  const previousRevenue = mockData[mockData.length - 2].revenue;
  const percentageChange =
    ((currentRevenue - previousRevenue) / previousRevenue) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Revenue Analytics</h2>
          <p className="text-gray-600">
            Track your platform's financial performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Total Revenue</div>
          <div className="text-3xl font-bold mb-2">
            £{currentRevenue.toLocaleString()}
          </div>
          <div
            className={`flex items-center ${percentageChange >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {percentageChange >= 0 ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-1" />
            )}
            {Math.abs(percentageChange).toFixed(1)}% from last period
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Active Subscriptions</div>
          <div className="text-3xl font-bold mb-2">
            {mockData[mockData.length - 1].subscriptions}
          </div>
          <div className="text-green-600 flex items-center">
            <ArrowUp className="w-4 h-4 mr-1" />
            12% from last month
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-2">Premium Listings</div>
          <div className="text-3xl font-bold mb-2">
            {mockData[mockData.length - 1].listings}
          </div>
          <div className="text-green-600 flex items-center">
            <ArrowUp className="w-4 h-4 mr-1" />
            8% from last month
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Revenue Over Time</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `£${value.toLocaleString()}`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <PaymentAnalytics />
    </div>
  );
}
