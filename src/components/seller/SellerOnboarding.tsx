import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function SellerOnboarding() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<SellerProfile>({
    business_name: "",
    business_type: "",
    registration_number: "",
    vat_number: "",
    contact_email: user?.email || "",
    contact_phone: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
    website: "",
    description: "",
    logo_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Update user role to seller
      const { error: roleError } = await supabase
        .from("profiles")
        .update({ role: "seller" })
        .eq("id", user.id);

      if (roleError) throw roleError;

      // Create seller profile
      const { error: sellerError } = await supabase.from("sellers").insert([
        {
          id: user.id,
          ...profile,
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (sellerError) throw sellerError;

      toast({
        title: "Success",
        description: "Your seller application has been submitted for review.",
      });

      navigate("/seller/dashboard");
    } catch (error) {
      console.error("Error creating seller profile:", error);
      toast({
        title: "Error",
        description: "Failed to create seller profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Become a Seller</h2>
            <p className="text-gray-600 mt-2">
              Complete your business information to start selling
            </p>
          </div>

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
                    setProfile({
                      ...profile,
                      registration_number: e.target.value,
                    })
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
                  onChange={(e) =>
                    setProfile({ ...profile, city: e.target.value })
                  }
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

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
