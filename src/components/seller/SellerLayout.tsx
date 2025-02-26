import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  Settings,
  FileText,
  BarChart,
} from "lucide-react";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/seller" },
  { icon: Car, label: "Vehicles", href: "/seller/vehicles" },
  { icon: MessageSquare, label: "Messages", href: "/seller/messages" },
  { icon: FileText, label: "Documents", href: "/seller/documents" },
  { icon: BarChart, label: "Analytics", href: "/seller/analytics" },
  { icon: Settings, label: "Settings", href: "/seller/settings" },
];

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold">Seller Dashboard</h1>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => navigate(item.href)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
