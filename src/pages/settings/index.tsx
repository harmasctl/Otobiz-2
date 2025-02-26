import { lazy, Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

// Lazy load settings sections
const ProfileSettings = lazy(() => import("./sections/ProfileSettings"));
const SecuritySettings = lazy(() => import("./sections/SecuritySettings"));
const NotificationSettings = lazy(
  () => import("./sections/NotificationSettings"),
);
const PreferenceSettings = lazy(() => import("./sections/PreferenceSettings"));

export default function SettingsPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Tabs defaultValue="profile" className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
        </div>

        <Suspense
          fallback={
            <Card className="p-6 flex items-center justify-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </Card>
          }
        >
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="preferences">
            <PreferenceSettings />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
}
