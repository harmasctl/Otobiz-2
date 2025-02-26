import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Eye, EyeOff } from "lucide-react";

export default function ApiSettings() {
  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKey] = useState("sk_test_1234567890");

  const generateNewKey = () => {
    // In a real app, this would call an API to generate a new key
    const newKey = `sk_test_${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">API Configuration</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>API Key</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    readOnly
                  />
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                <Button variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button onClick={generateNewKey}>Generate New Key</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Webhook URL</Label>
              <Input placeholder="https://your-domain.com/webhook" />
            </div>

            <div className="space-y-2">
              <Label>Allowed Origins</Label>
              <Input placeholder="https://your-domain.com" />
              <p className="text-sm text-gray-600">
                Comma-separated list of allowed origins for CORS
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Rate Limiting</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Requests per minute</Label>
              <Input type="number" defaultValue="60" />
            </div>
            <div className="space-y-2">
              <Label>Burst limit</Label>
              <Input type="number" defaultValue="100" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
