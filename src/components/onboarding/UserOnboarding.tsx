import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/lib/supabase";
import { useApp } from "@/context/AppContext";
import { toast } from "@/components/ui/use-toast";

interface UserProfile {
  avatar_url?: string;
  bio?: string;
  location?: string;
  phone?: string;
  preferences?: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    privacy: {
      showEmail: boolean;
      showPhone: boolean;
    };
  };
}

export default function UserOnboarding() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    bio: "",
    location: "",
    phone: "",
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      privacy: {
        showEmail: false,
        showPhone: false,
      },
    },
  });

  const skipOnboarding = () => {
    navigate("/");
  };

  const handleImageUpload = async (file: File) => {
    if (!user) return;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      setProfile({ ...profile, avatar_url: publicUrl });

      toast({
        title: "Success",
        description: "Profile picture uploaded successfully!",
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

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const updateData = {
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        location: profile.location,
        phone: profile.phone,
        preferences: profile.preferences,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile setup completed!",
      });

      navigate("/");
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

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Profile Picture</Label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="text-4xl text-gray-400">👤</div>
            )}
          </div>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
          <Button
            variant="outline"
            onClick={() => {
              const input = document.querySelector('input[type="file"]');
              if (input) input.click();
            }}
          >
            Upload Photo
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Bio</Label>
        <Textarea
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          placeholder="Tell us about yourself (minimum 10 characters)"
          className="h-32"
          minLength={10}
          maxLength={500}
        />
        {profile.bio && profile.bio.length < 10 && (
          <p className="text-sm text-red-500">
            Bio must be at least 10 characters
          </p>
        )}
      </div>

      <Button
        className="w-full"
        onClick={() => setStep(2)}
        disabled={!profile.bio || profile.bio.length < 10}
      >
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          placeholder="Enter your location"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          placeholder="Enter your phone number"
          type="tel"
          required
        />
      </div>

      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button
          onClick={() => setStep(3)}
          disabled={!profile.location || !profile.phone}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Notification Preferences</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div>Email Notifications</div>
              <div className="text-sm text-gray-500">
                Receive updates via email
              </div>
            </div>
            <Switch
              checked={profile.preferences?.notifications.email}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences!,
                    notifications: {
                      ...profile.preferences!.notifications,
                      email: checked,
                    },
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div>Push Notifications</div>
              <div className="text-sm text-gray-500">
                Receive push notifications
              </div>
            </div>
            <Switch
              checked={profile.preferences?.notifications.push}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences!,
                    notifications: {
                      ...profile.preferences!.notifications,
                      push: checked,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Privacy Settings</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div>Show Email</div>
              <div className="text-sm text-gray-500">
                Display email on profile
              </div>
            </div>
            <Switch
              checked={profile.preferences?.privacy.showEmail}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences!,
                    privacy: {
                      ...profile.preferences!.privacy,
                      showEmail: checked,
                    },
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div>Show Phone Number</div>
              <div className="text-sm text-gray-500">
                Display phone on profile
              </div>
            </div>
            <Switch
              checked={profile.preferences?.privacy.showPhone}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences!,
                    privacy: {
                      ...profile.preferences!.privacy,
                      showPhone: checked,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={() => setStep(2)}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Completing Setup..." : "Complete Setup"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-6 space-y-6">
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="sm" onClick={skipOnboarding}>
            Skip for now
          </Button>
        </div>

        <div className="text-center">
          <div className="w-full flex justify-center mb-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i === step ? "bg-primary" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
          <h2 className="text-2xl font-bold">Complete Your Profile</h2>
          <p className="text-gray-600 mt-2">
            Step {step} of 3:{" "}
            {step === 1
              ? "Basic Info"
              : step === 2
                ? "Contact Details"
                : "Preferences"}
          </p>
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </Card>
    </div>
  );
}
