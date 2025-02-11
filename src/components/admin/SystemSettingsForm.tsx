import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import AdminLayout from "./AdminLayout";
import { useState } from "react";
import { useConfirmation } from "@/hooks/useConfirmation";
import ConfirmationDialog from "./ConfirmationDialog";

interface SystemSettings {
  general: {
    siteName: string;
    siteUrl: string;
    supportEmail: string;
    maxListingsPerUser: number;
  };
  features: {
    enableRegistration: boolean;
    requireEmailVerification: boolean;
    enableChat: boolean;
    enableComparisons: boolean;
    enableReviews: boolean;
    enableWishlist: boolean;
  };
  security: {
    maxLoginAttempts: number;
    sessionTimeout: number;
    requireStrongPasswords: boolean;
    enable2FA: boolean;
  };
  notifications: {
    enableEmailNotifications: boolean;
    enablePushNotifications: boolean;
    enableSmsNotifications: boolean;
    adminEmailNotifications: boolean;
  };
}

const defaultSettings: SystemSettings = {
  general: {
    siteName: "Otobiz",
    siteUrl: "https://otobiz.com",
    supportEmail: "support@otobiz.com",
    maxListingsPerUser: 10,
  },
  features: {
    enableRegistration: true,
    requireEmailVerification: true,
    enableChat: true,
    enableComparisons: true,
    enableReviews: true,
    enableWishlist: true,
  },
  security: {
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    requireStrongPasswords: true,
    enable2FA: false,
  },
  notifications: {
    enableEmailNotifications: true,
    enablePushNotifications: true,
    enableSmsNotifications: false,
    adminEmailNotifications: true,
  },
};

export default function SystemSettingsForm() {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const { isOpen, message, confirm, handleConfirm, handleCancel } =
    useConfirmation();

  const handleSave = () => {
    confirm(
      "Are you sure you want to update the system settings? This may affect all users.",
      () => {
        // Save settings logic here
        console.log("Settings saved:", settings);
      },
    );
  };

  const handleReset = () => {
    confirm(
      "Are you sure you want to reset all settings to their default values?",
      () => setSettings(defaultSettings),
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-gray-600">Configure global system settings</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 border rounded-lg p-1">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="p-6 space-y-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input
                    value={settings.general.siteName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: {
                          ...settings.general,
                          siteName: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Site URL</Label>
                  <Input
                    value={settings.general.siteUrl}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: {
                          ...settings.general,
                          siteUrl: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input
                    value={settings.general.supportEmail}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: {
                          ...settings.general,
                          supportEmail: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Max Listings per User</Label>
                  <Input
                    type="number"
                    value={settings.general.maxListingsPerUser}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: {
                          ...settings.general,
                          maxListingsPerUser: parseInt(e.target.value),
                        },
                      })
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                {Object.entries(settings.features).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label className="cursor-pointer">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          features: { ...settings.features, [key]: checked },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6 space-y-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label>Max Login Attempts</Label>
                  <Input
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: {
                          ...settings.security,
                          maxLoginAttempts: parseInt(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: {
                          ...settings.security,
                          sessionTimeout: parseInt(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Require Strong Passwords</Label>
                  <Switch
                    checked={settings.security.requireStrongPasswords}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        security: {
                          ...settings.security,
                          requireStrongPasswords: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Enable 2FA</Label>
                  <Switch
                    checked={settings.security.enable2FA}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, enable2FA: checked },
                      })
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label className="cursor-pointer">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [key]: checked,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        <ConfirmationDialog
          isOpen={isOpen}
          message={message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  );
}
