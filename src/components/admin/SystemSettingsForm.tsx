import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SystemSettings {
  siteName: string;
  contactEmail: string;
  maxListingsPerUser: number;
  requireEmailVerification: boolean;
  enableUserRegistration: boolean;
  maintenanceMode: boolean;
  autoApproveListings: boolean;
}

const mockSettings: SystemSettings = {
  siteName: "Otobiz",
  contactEmail: "support@otobiz.sn",
  maxListingsPerUser: 10,
  requireEmailVerification: true,
  enableUserRegistration: true,
  maintenanceMode: false,
  autoApproveListings: false,
};

export default function SystemSettingsForm() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-gray-600 mt-2">
            Configure global settings for the platform
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input defaultValue={mockSettings.siteName} />
            </div>

            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input defaultValue={mockSettings.contactEmail} type="email" />
            </div>

            <div className="space-y-2">
              <Label>Max Listings per User</Label>
              <Input
                defaultValue={mockSettings.maxListingsPerUser}
                type="number"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Email Verification</Label>
                <div className="text-sm text-gray-600">
                  Users must verify their email before accessing the platform
                </div>
              </div>
              <Switch checked={mockSettings.requireEmailVerification} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable User Registration</Label>
                <div className="text-sm text-gray-600">
                  Allow new users to register accounts
                </div>
              </div>
              <Switch checked={mockSettings.enableUserRegistration} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <div className="text-sm text-gray-600">
                  Put the site in maintenance mode
                </div>
              </div>
              <Switch checked={mockSettings.maintenanceMode} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-approve Listings</Label>
                <div className="text-sm text-gray-600">
                  Automatically approve new vehicle listings
                </div>
              </div>
              <Switch checked={mockSettings.autoApproveListings} />
            </div>
          </div>

          <div className="pt-6 space-x-4">
            <Button>Save Changes</Button>
            <Button variant="outline">Reset to Defaults</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
