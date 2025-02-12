import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaymentSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Payment Settings</h2>
        <p className="text-gray-600">
          Configure payment methods and processing
        </p>
      </div>

      <div className="grid gap-6">
        {/* Payment Gateways */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Gateways</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Stripe</h4>
                <p className="text-sm text-gray-600">Credit card processing</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-green-600">Connected</div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">PayPal</h4>
                <p className="text-sm text-gray-600">PayPal payments</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">Not connected</div>
                <Button size="sm">Connect</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Currency Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Currency Settings</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Currency</Label>
                <Select defaultValue="GBP">
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Currency Display</Label>
                <Select defaultValue="symbol">
                  <SelectTrigger>
                    <SelectValue placeholder="Select display format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="symbol">Symbol (£)</SelectItem>
                    <SelectItem value="code">Code (GBP)</SelectItem>
                    <SelectItem value="both">Both (£ GBP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Tax Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tax Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Tax Calculations</Label>
                <p className="text-sm text-gray-600">
                  Apply tax to transactions
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Tax Rate (%)</Label>
                <Input type="number" placeholder="20" />
              </div>
              <div className="space-y-2">
                <Label>Tax Number (VAT)</Label>
                <Input placeholder="Enter VAT number" />
              </div>
            </div>
          </div>
        </Card>

        {/* Invoice Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Invoice Settings</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Invoice Prefix</Label>
              <Input placeholder="INV-" />
            </div>
            <div className="space-y-2">
              <Label>Company Details</Label>
              <Textarea
                placeholder="Enter company details to display on invoices"
                className="h-20"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-send Invoices</Label>
                <p className="text-sm text-gray-600">
                  Automatically email invoices to customers
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Payment Terms */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Terms</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Payment Term</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="15">Net 15</SelectItem>
                    <SelectItem value="30">Net 30</SelectItem>
                    <SelectItem value="60">Net 60</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Late Payment Fee (%)</Label>
                <Input type="number" placeholder="2" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
