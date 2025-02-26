import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, UserPlus, Settings, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 justify-start"
          onClick={() => navigate("/admin/listings/new")}
        >
          <Plus className="h-4 w-4" />
          <div className="text-left">
            <div className="font-medium">Add Listing</div>
            <div className="text-sm text-gray-600">
              Create a new vehicle listing
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 justify-start"
          onClick={() => navigate("/admin/users/invite")}
        >
          <UserPlus className="h-4 w-4" />
          <div className="text-left">
            <div className="font-medium">Invite User</div>
            <div className="text-sm text-gray-600">Send user invitations</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 justify-start"
          onClick={() => navigate("/admin/content/new")}
        >
          <FileText className="h-4 w-4" />
          <div className="text-left">
            <div className="font-medium">Add Content</div>
            <div className="text-sm text-gray-600">Create pages or posts</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2 h-auto py-4 justify-start"
          onClick={() => navigate("/admin/settings")}
        >
          <Settings className="h-4 w-4" />
          <div className="text-left">
            <div className="font-medium">Settings</div>
            <div className="text-sm text-gray-600">
              Configure system settings
            </div>
          </div>
        </Button>
      </div>
    </Card>
  );
}
