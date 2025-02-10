import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InviteForm() {
  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Invite New User</h2>
          <p className="text-gray-600 mt-2">
            Send an invitation to join the platform
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input type="email" placeholder="Enter email address" />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="dealer">Dealer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Custom Message (Optional)</Label>
            <textarea
              className="w-full h-24 px-3 py-2 border rounded-md"
              placeholder="Add a personal message to the invitation email"
            />
          </div>

          <div className="pt-4">
            <Button className="w-full">Send Invitation</Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            The user will receive an email with instructions to set up their
            account.
          </div>
        </div>
      </div>
    </div>
  );
}
