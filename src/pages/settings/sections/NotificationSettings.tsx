import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useProfile } from "@/lib/hooks/useProfile";
import { Bell, Mail } from "lucide-react";

export default function NotificationSettings() {
  const { profile, updateProfile } = useProfile();

  const notifications = profile?.notification_settings || {
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
  };

  const updateNotificationSetting = (
    type: "email" | "push",
    key: string,
    value: boolean,
  ) => {
    const newSettings = {
      ...notifications,
      [type]: {
        ...notifications[type],
        [key]: value,
      },
    };
    updateProfile({ notification_settings: newSettings });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Mail className="w-5 h-5" /> Email Notifications
        </h3>
        <div className="space-y-4">
          {Object.entries(notifications.email).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium capitalize">{key}</div>
                <div className="text-sm text-gray-500">
                  Receive {key} notifications via email
                </div>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) =>
                  updateNotificationSetting("email", key, checked)
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5" /> Push Notifications
        </h3>
        <div className="space-y-4">
          {Object.entries(notifications.push).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium capitalize">{key}</div>
                <div className="text-sm text-gray-500">
                  Receive {key} push notifications
                </div>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) =>
                  updateNotificationSetting("push", key, checked)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
