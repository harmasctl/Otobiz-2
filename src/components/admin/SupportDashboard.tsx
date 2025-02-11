import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, Phone, Mail, Filter } from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  user: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  createdAt: string;
  lastUpdated: string;
}

const mockTickets: Ticket[] = [
  {
    id: "T-1001",
    subject: "Unable to upload listing images",
    user: "john@example.com",
    status: "open",
    priority: "high",
    category: "Technical",
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "T-1002",
    subject: "Payment verification pending",
    user: "sarah@example.com",
    status: "in_progress",
    priority: "medium",
    category: "Billing",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    lastUpdated: new Date().toISOString(),
  },
];

export default function SupportDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Support Dashboard</h1>
            <p className="text-gray-600">
              Manage customer support tickets and inquiries
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Call Center
            </Button>
            <Button>
              <MessageCircle className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Open Tickets", value: "23", trend: "up", change: "+5" },
            {
              label: "Avg Response Time",
              value: "2.5h",
              trend: "down",
              change: "-30m",
            },
            {
              label: "Resolution Rate",
              value: "94%",
              trend: "up",
              change: "+2%",
            },
            {
              label: "Customer Satisfaction",
              value: "4.8/5",
              trend: "up",
              change: "+0.2",
            },
          ].map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-3xl font-bold mt-2">{stat.value}</div>
              <div
                className={`text-sm mt-2 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change} from last week
              </div>
            </Card>
          ))}
        </div>

        {/* Ticket Management */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search tickets..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="space-y-4">
            {mockTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-medium text-gray-600">
                      #{ticket.id}
                    </span>
                    <Badge
                      variant={
                        ticket.priority === "urgent"
                          ? "destructive"
                          : ticket.priority === "high"
                            ? "warning"
                            : "secondary"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                    <Badge
                      variant={
                        ticket.status === "open"
                          ? "default"
                          : ticket.status === "in_progress"
                            ? "warning"
                            : ticket.status === "resolved"
                              ? "success"
                              : "secondary"
                      }
                    >
                      {ticket.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="font-medium">{ticket.subject}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {ticket.user} · {ticket.category} · Created{" "}
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
