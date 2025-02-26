import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettingsStore } from "@/store/useSettingsStore";
import EmailTemplates from "./EmailTemplates";
import NotificationSettings from "./NotificationSettings";
import ApiSettings from "./ApiSettings";

export default function SystemSettings() {
  const { settings, loading, updateSettings } = useSettingsStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings(settings);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">System Settings</h2>
          <p className="text-gray-600">Configure system-wide settings</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input
                    value={settings.site.name}
                    onChange={(e) =>
                      updateSettings({
                        site: { ...settings.site, name: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Site Description</Label>
                  <Input
                    value={settings.site.description}
                    onChange={(e) =>
                      updateSettings({
                        site: { ...settings.site, description: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <Input
                    type="color"
                    value={settings.site.primaryColor}
                    onChange={(e) =>
                      updateSettings({
                        site: {
                          ...settings.site,
                          primaryColor: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <Input
                    type="color"
                    value={settings.site.secondaryColor}
                    onChange={(e) =>
                      updateSettings({
                        site: {
                          ...settings.site,
                          secondaryColor: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Feature Toggles</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>User Registration</Label>
                      <p className="text-sm text-gray-600">
                        Allow new users to register
                      </p>
                    </div>
                    <Switch
                      checked={settings.features.registration}
                      onCheckedChange={(checked) =>
                        updateSettings({
                          features: {
                            ...settings.features,
                            registration: checked,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Verification</Label>
                      <p className="text-sm text-gray-600">
                        Require email verification
                      </p>
                    </div>
                    <Switch
                      checked={settings.features.emailVerification}
                      onCheckedChange={(checked) =>
                        updateSettings({
                          features: {
                            ...settings.features,
                            emailVerification: checked,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Chat System</Label>
                      <p className="text-sm text-gray-600">
                        Enable chat between users
                      </p>
                    </div>
                    <Switch
                      checked={settings.features.chat}
                      onCheckedChange={(checked) =>
                        updateSettings({
                          features: { ...settings.features, chat: checked },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <EmailTemplates />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="api">
          <ApiSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
