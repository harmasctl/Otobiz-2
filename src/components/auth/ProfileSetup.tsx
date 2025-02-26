import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { useApp } from "@/context/AppContext";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    phone: "",
    location: "",
    bio: "",
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

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          ...formData,
          setup_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          placeholder="Enter your location"
        />
      </div>

      <Button className="w-full" onClick={() => setStep(2)}>
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Bio</Label>
        <Textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Tell us about yourself"
          className="h-32"
        />
      </div>

      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button onClick={() => setStep(3)}>Continue</Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Notification Preferences</Label>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={formData.preferences.notifications.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferences: {
                    ...formData.preferences,
                    notifications: {
                      ...formData.preferences.notifications,
                      email: e.target.checked,
                    },
                  },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <input
              type="checkbox"
              checked={formData.preferences.notifications.push}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferences: {
                    ...formData.preferences,
                    notifications: {
                      ...formData.preferences.notifications,
                      push: e.target.checked,
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
          {loading ? "Saving..." : "Complete Setup"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-6 space-y-6">
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
                ? "About You"
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
