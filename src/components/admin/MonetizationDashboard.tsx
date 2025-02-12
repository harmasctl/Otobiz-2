import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import PricingPlans from "./pricing/PricingPlans";
import PricingManager from "./pricing/PricingManager";
import ListingBoostOptions from "./listings/ListingBoostOptions";
import ListingBoostManager from "./listings/ListingBoostManager";
import RevenueAnalytics from "./analytics/RevenueAnalytics";
import PaymentAnalytics from "./analytics/PaymentAnalytics";
import PaymentSettings from "./payments/PaymentSettings";
import SubscriptionManager from "./subscriptions/SubscriptionManager";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Settings, CreditCard, FileText, BarChart } from "lucide-react";

export default function MonetizationDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Monetization Dashboard</h1>
            <p className="text-gray-600">
              Manage all revenue streams and payment options
            </p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="subscriptions"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> Subscription Plans
            </TabsTrigger>
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" /> Premium Listings
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Payments
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" /> Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <RevenueAnalytics />
            </div>
          </TabsContent>

          <TabsContent value="subscriptions">
            <div className="space-y-6">
              <Card className="p-6">
                <PricingManager />
              </Card>
              <Card className="p-6">
                <PricingPlans />
              </Card>
              <Card className="p-6">
                <SubscriptionManager
                  onUpgrade={() => {}}
                  onCancel={() => {}}
                  onRenew={() => {}}
                />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings">
            <div className="space-y-6">
              <Card className="p-6">
                <ListingBoostManager />
              </Card>
              <Card className="p-6">
                <ListingBoostOptions />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="space-y-6">
              <PaymentAnalytics />
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <PaymentSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
