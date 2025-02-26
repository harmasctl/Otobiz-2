import { useState, useEffect } from "react";
import DeleteAccountDialog from "../dialogs/DeleteAccountDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useApp } from "@/context/AppContext";
import {
  User,
  Settings,
  Mail,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function ProfileSettings() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { user } = useApp();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    avatar_url: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    theme_preference: "light",
    language: "en",
    timezone: "",
    social_links: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    notification_settings: {
      email: {
        marketing: true,
        security: true,
        updates: true,
      },
      push: {
        messages: true,
        offers: true,
        reminders: true,
      },
    },
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      if (data) setProfile({ ...profile, ...data });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("profiles")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("profiles").getPublicUrl(filePath);

      await updateProfile({ avatar_url: publicUrl });
      setProfile({ ...profile, avatar_url: publicUrl });

      toast({
        title: "Success",
        description: "Profile picture updated!",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (updates: Partial<typeof profile>) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Tabs defaultValue="general" className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-full h-full p-4 text-gray-400" />
                  )}
                </div>
                <Input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute bottom-0 right-0"
                  onClick={() => {
                    const input = document.querySelector('input[type="file"]');
                    if (input) input.click();
                  }}
                >
                  Change
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={profile.full_name}
                      onChange={(e) =>
                        setProfile({ ...profile, full_name: e.target.value })
                      }
                      onBlur={() =>
                        updateProfile({ full_name: profile.full_name })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={profile.email} disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    onBlur={() => updateProfile({ bio: profile.bio })}
                    placeholder="Tell us about yourself"
                  />
                </div>
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
                  onBlur={() => updateProfile({ phone: profile.phone })}
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  onBlur={() => updateProfile({ location: profile.location })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Social Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Facebook</Label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      className="pl-10"
                      value={profile.social_links.facebook}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          social_links: {
                            ...profile.social_links,
                            facebook: e.target.value,
                          },
                        })
                      }
                      onBlur={() =>
                        updateProfile({ social_links: profile.social_links })
                      }
                      placeholder="Facebook URL"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Twitter</Label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      className="pl-10"
                      value={profile.social_links.twitter}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          social_links: {
                            ...profile.social_links,
                            twitter: e.target.value,
                          },
                        })
                      }
                      onBlur={() =>
                        updateProfile({ social_links: profile.social_links })
                      }
                      placeholder="Twitter URL"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Mail className="w-5 h-5" /> Email Notifications
              </h3>
              <div className="space-y-4">
                {Object.entries(profile.notification_settings.email).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium capitalize">{key}</div>
                        <div className="text-sm text-gray-500">
                          Receive {key} notifications via email
                        </div>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => {
                          const newSettings = {
                            ...profile.notification_settings,
                            email: {
                              ...profile.notification_settings.email,
                              [key]: checked,
                            },
                          };
                          setProfile({
                            ...profile,
                            notification_settings: newSettings,
                          });
                          updateProfile({ notification_settings: newSettings });
                        }}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5" /> Push Notifications
              </h3>
              <div className="space-y-4">
                {Object.entries(profile.notification_settings.push).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium capitalize">{key}</div>
                        <div className="text-sm text-gray-500">
                          Receive {key} push notifications
                        </div>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => {
                          const newSettings = {
                            ...profile.notification_settings,
                            push: {
                              ...profile.notification_settings.push,
                              [key]: checked,
                            },
                          };
                          setProfile({
                            ...profile,
                            notification_settings: newSettings,
                          });
                          updateProfile({ notification_settings: newSettings });
                        }}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select
                  value={profile.theme_preference}
                  onValueChange={(value) => {
                    setProfile({ ...profile, theme_preference: value });
                    updateProfile({ theme_preference: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={profile.language}
                  onValueChange={(value) => {
                    setProfile({ ...profile, language: value });
                    updateProfile({ language: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select
                  value={profile.timezone}
                  onValueChange={(value) => {
                    setProfile({ ...profile, timezone: value });
                    updateProfile({ timezone: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">
                      Eastern Time
                    </SelectItem>
                    <SelectItem value="America/Chicago">
                      Central Time
                    </SelectItem>
                    <SelectItem value="America/Denver">
                      Mountain Time
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles">
                      Pacific Time
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5" /> Security Settings
              </h3>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Enable Two-Factor Authentication
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-600"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Delete Account
                </Button>
                <DeleteAccountDialog
                  open={showDeleteDialog}
                  onOpenChange={setShowDeleteDialog}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
