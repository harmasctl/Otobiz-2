import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { useApp } from "@/context/AppContext";
import { toast } from "@/components/ui/use-toast";

interface SellerProfile {
  business_name: string;
  business_type: string;
  registration_number: string;
  vat_number: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  website: string;
  description: string;
  logo_url: string;
}

export default function SellerProfile() {
  const { user } = useApp();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<SellerProfile>({
    business_name: "",
    business_type: "",
    registration_number: "",
    vat_number: "",
    contact_email: "",
    contact_phone: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
    website: "",
    description: "",
    logo_url: "",
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("sellers")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("sellers").upsert({
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      toast({
        title: "Success",
        description: "Profile updated successfully",
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
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Business Name</Label>
            <Input
              value={profile.business_name}
              onChange={(e) =>
                setProfile({ ...profile, business_name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Business Type</Label>
            <Input
              value={profile.business_type}
              onChange={(e) =>
                setProfile({ ...profile, business_type: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Registration Number</Label>
            <Input
              value={profile.registration_number}
              onChange={(e) =>
                setProfile({ ...profile, registration_number: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>VAT Number</Label>
            <Input
              value={profile.vat_number}
              onChange={(e) =>
                setProfile({ ...profile, vat_number: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Contact Email</Label>
            <Input
              type="email"
              value={profile.contact_email}
              onChange={(e) =>
                setProfile({ ...profile, contact_email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Contact Phone</Label>
            <Input
              value={profile.contact_phone}
              onChange={(e) =>
                setProfile({ ...profile, contact_phone: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Address</Label>
          <Input
            value={profile.address}
            onChange={(e) =>
              setProfile({ ...profile, address: e.target.value })
            }
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Country</Label>
            <Input
              value={profile.country}
              onChange={(e) =>
                setProfile({ ...profile, country: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Postal Code</Label>
            <Input
              value={profile.postal_code}
              onChange={(e) =>
                setProfile({ ...profile, postal_code: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Website</Label>
          <Input
            type="url"
            value={profile.website}
            onChange={(e) =>
              setProfile({ ...profile, website: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Business Description</Label>
          <Textarea
            value={profile.description}
            onChange={(e) =>
              setProfile({ ...profile, description: e.target.value })
            }
            className="h-32"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Logo URL</Label>
          <Input
            type="url"
            value={profile.logo_url}
            onChange={(e) =>
              setProfile({ ...profile, logo_url: e.target.value })
            }
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Card>
  );
}
