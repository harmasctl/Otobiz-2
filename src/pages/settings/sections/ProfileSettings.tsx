import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/lib/hooks/useProfile";
import { User } from "lucide-react";

export default function ProfileSettings() {
  const { profile, loading, updateProfile } = useProfile();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setImageFile(file);
    // Handle image upload logic here
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            {profile?.avatar_url ? (
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
                value={profile?.full_name || ""}
                onChange={(e) => updateProfile({ full_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={profile?.email || ""} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              value={profile?.bio || ""}
              onChange={(e) => updateProfile({ bio: e.target.value })}
              placeholder="Tell us about yourself"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            value={profile?.phone || ""}
            onChange={(e) => updateProfile({ phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            value={profile?.location || ""}
            onChange={(e) => updateProfile({ location: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
}
