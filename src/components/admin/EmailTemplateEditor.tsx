import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
}

const mockTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Welcome Email",
    subject: "Welcome to Otobiz!",
    content:
      "Hi {{name}},\n\nWelcome to Otobiz! We're excited to have you on board.",
    variables: ["name"],
  },
  {
    id: "2",
    name: "Listing Approved",
    subject: "Your listing has been approved",
    content: "Hi {{name}},\n\nYour listing {{listingTitle}} has been approved.",
    variables: ["name", "listingTitle"],
  },
];

export default function EmailTemplateEditor() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(mockTemplates[0]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Email Templates</h1>
            <p className="text-gray-600">Manage system email templates</p>
          </div>
          <Button>Create Template</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
          {/* Template List */}
          <Card className="p-4 space-y-4">
            <div className="font-medium mb-2">Templates</div>
            <div className="space-y-2">
              {mockTemplates.map((template) => (
                <button
                  key={template.id}
                  className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 ${selectedTemplate?.id === template.id ? "bg-gray-100" : ""}`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </Card>

          {/* Editor */}
          {selectedTemplate && (
            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Template Name</label>
                  <Input
                    value={selectedTemplate.name}
                    onChange={() => {}}
                    className="max-w-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    value={selectedTemplate.subject}
                    onChange={() => {}}
                    className="max-w-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={selectedTemplate.content}
                    onChange={() => {}}
                    className="min-h-[300px] font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Available Variables
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map((variable) => (
                      <code
                        key={variable}
                        className="px-2 py-1 bg-gray-100 rounded text-sm"
                      >
                        {"{{"}
                        {variable}
                        {"}}"}
                      </code>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Preview</Button>
                <Button>Save Changes</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
