import AdminLayout from "./AdminLayout";
import AnalyticsChart from "./AnalyticsChart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export default function AnalyticsDashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-gray-600">Track platform performance metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date?.from ? (
                date.to ? (
                  <>
                    {date.from.toLocaleDateString()} -{" "}
                    {date.to.toLocaleDateString()}
                  </>
                ) : (
                  date.from.toLocaleDateString()
                )
              ) : (
                "Pick a date"
              )}
            </Button>
            <select className="border rounded-md px-3 py-2">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Users",
              value: "12,345",
              change: "+12%",
              trend: "up",
            },
            {
              label: "Active Listings",
              value: "4,567",
              change: "+8%",
              trend: "up",
            },
            {
              label: "Monthly Revenue",
              value: "£98,765",
              change: "+15%",
              trend: "up",
            },
            {
              label: "Conversion Rate",
              value: "2.8%",
              change: "-2%",
              trend: "down",
            },
          ].map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-3xl font-bold mt-2">{stat.value}</div>
              <div
                className={`text-sm mt-2 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change} from last month
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Revenue Overview</h3>
            <AnalyticsChart />
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">User Growth</h3>
            <AnalyticsChart />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Popular Listings</h3>
            {/* Add popular listings table */}
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">User Activity</h3>
            {/* Add user activity chart */}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
