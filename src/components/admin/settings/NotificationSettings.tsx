import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function NotificationSettings() {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Notification Channels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">
                  Send notifications via email
                </p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) =>
                  updateSettings({
                    notifications: {
                      ...settings.notifications,
                      email: checked,
                    },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-600">
                  Send browser push notifications
                </p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(checked) =>
                  updateSettings({
                    notifications: { ...settings.notifications, push: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-600">
                  Send notifications via SMS
                </p>
              </div>
              <Switch
                checked={settings.notifications.sms}
                onCheckedChange={(checked) =>
                  updateSettings({
                    notifications: { ...settings.notifications, sms: checked },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Email Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From Name</Label>
              <Input
                value={settings.email.fromName}
                onChange={(e) =>
                  updateSettings({
                    email: { ...settings.email, fromName: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>From Email</Label>
              <Input
                value={settings.email.fromEmail}
                onChange={(e) =>
                  updateSettings({
                    email: { ...settings.email, fromEmail: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
