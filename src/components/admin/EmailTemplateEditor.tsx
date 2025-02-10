import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
}

const mockTemplate: EmailTemplate = {
  id: "1",
  name: "Welcome Email",
  subject: "Welcome to AutoTrader, {{name}}!",
  content:
    "Dear {{name}},\n\nWelcome to AutoTrader! We're excited to have you on board...",
  variables: ["name", "email", "verificationLink"],
};

export default function EmailTemplateEditor() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Email Template Editor</h2>
        <div className="space-x-4">
          <select className="border rounded-md px-3 py-2">
            <option>Welcome Email</option>
            <option>Password Reset</option>
            <option>Listing Approved</option>
            <option>Account Verification</option>
          </select>
          <Button>Save Template</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Template Name</Label>
            <Input defaultValue={mockTemplate.name} />
          </div>

          <div className="space-y-2">
            <Label>Subject Line</Label>
            <Input defaultValue={mockTemplate.subject} />
          </div>

          <div className="space-y-2">
            <Label>Email Content</Label>
            <Textarea
              className="min-h-[300px] font-mono"
              defaultValue={mockTemplate.content}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Available Variables</h3>
            <div className="space-y-2">
              {mockTemplate.variables.map((variable) => (
                <div
                  key={variable}
                  className="flex items-center justify-between p-2 bg-white rounded border"
                >
                  <code className="text-sm">{{ variable }}</code>
                  <Button variant="ghost" size="sm">
                    Insert
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Preview</h3>
            <Button className="w-full" variant="outline">
              Send Test Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
