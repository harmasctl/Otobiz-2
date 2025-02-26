import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
}

export default function EmailTemplates() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "welcome",
      name: "Welcome Email",
      subject: "Welcome to {{siteName}}!",
      content: "Dear {{userName}},\n\nWelcome to {{siteName}}!",
      variables: ["siteName", "userName"],
    },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );

  const addTemplate = () => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: "New Template",
      subject: "",
      content: "",
      variables: [],
    };
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Email Templates</h3>
        <Button onClick={addTemplate}>
          <Plus className="w-4 h-4 mr-2" /> Add Template
        </Button>
      </div>

      <div className="grid grid-cols-[300px,1fr] gap-6">
        <div className="space-y-2">
          {templates.map((template) => (
            <Button
              key={template.id}
              variant={
                selectedTemplate?.id === template.id ? "default" : "ghost"
              }
              className="w-full justify-start"
              onClick={() => setSelectedTemplate(template)}
            >
              {template.name}
            </Button>
          ))}
        </div>

        {selectedTemplate && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Template Name</Label>
              <Input
                value={selectedTemplate.name}
                onChange={(e) => {
                  const updated = templates.map((t) =>
                    t.id === selectedTemplate.id
                      ? { ...t, name: e.target.value }
                      : t,
                  );
                  setTemplates(updated);
                  setSelectedTemplate({
                    ...selectedTemplate,
                    name: e.target.value,
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                value={selectedTemplate.subject}
                onChange={(e) => {
                  const updated = templates.map((t) =>
                    t.id === selectedTemplate.id
                      ? { ...t, subject: e.target.value }
                      : t,
                  );
                  setTemplates(updated);
                  setSelectedTemplate({
                    ...selectedTemplate,
                    subject: e.target.value,
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={selectedTemplate.content}
                onChange={(e) => {
                  const updated = templates.map((t) =>
                    t.id === selectedTemplate.id
                      ? { ...t, content: e.target.value }
                      : t,
                  );
                  setTemplates(updated);
                  setSelectedTemplate({
                    ...selectedTemplate,
                    content: e.target.value,
                  });
                }}
                className="min-h-[300px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Available Variables</Label>
              <div className="text-sm text-gray-600">
                {selectedTemplate.variables.map((variable) => (
                  <code
                    key={variable}
                    className="px-2 py-1 mx-1 bg-gray-100 rounded"
                  >
                    {`{{${variable}}}`}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
