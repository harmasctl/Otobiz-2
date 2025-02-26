import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateProfile } from "@/lib/auth";
import { Car, Heart, Settings, Bell } from "lucide-react";

export default function UserProfile() {
  const { user, logout } = useApp();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    phone: "",
    location: "",
  });

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);

    try {
      await updateProfile(user.id, profile);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={
                user?.avatar_url ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`
              }
              alt={user?.full_name || "User"}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.full_name}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={profile.full_name}
                      onChange={(e) =>
                        setProfile({ ...profile, full_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={profile.email} disabled />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleUpdate} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Account Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Car className="w-8 h-8 text-primary mb-2" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-600">Active Listings</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Heart className="w-8 h-8 text-primary mb-2" />
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-sm text-gray-600">Saved Vehicles</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Bell className="w-8 h-8 text-primary mb-2" />
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-gray-600">New Notifications</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Settings className="w-8 h-8 text-primary mb-2" />
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-gray-600">Recent Activities</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="listings">
            {/* Add listings content */}
          </TabsContent>

          <TabsContent value="saved">
            {/* Add saved vehicles content */}
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <Button variant="destructive" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
