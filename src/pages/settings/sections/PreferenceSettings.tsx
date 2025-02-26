import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "@/lib/hooks/useProfile";
import { Globe, Moon } from "lucide-react";

export default function PreferenceSettings() {
  const { profile, updateProfile } = useProfile();

  return (
    <Card className="p-6 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Moon className="w-4 h-4" /> Theme
          </Label>
          <Select
            value={profile?.theme_preference || "light"}
            onValueChange={(value) =>
              updateProfile({ theme_preference: value })
            }
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
          <Label className="flex items-center gap-2">
            <Globe className="w-4 h-4" /> Language
          </Label>
          <Select
            value={profile?.language || "en"}
            onValueChange={(value) => updateProfile({ language: value })}
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
      </div>
    </Card>
  );
}
