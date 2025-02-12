import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface InspectionItem {
  category: string;
  items: {
    name: string;
    status: "pass" | "fail" | "warning" | "";
    notes: string;
  }[];
}

const inspectionCategories: InspectionItem[] = [
  {
    category: "Exterior",
    items: [
      { name: "Body Condition", status: "", notes: "" },
      { name: "Paint Quality", status: "", notes: "" },
      { name: "Glass/Mirrors", status: "", notes: "" },
      { name: "Lights", status: "", notes: "" },
      { name: "Tires", status: "", notes: "" },
    ],
  },
  {
    category: "Interior",
    items: [
      { name: "Seats", status: "", notes: "" },
      { name: "Dashboard", status: "", notes: "" },
      { name: "Electronics", status: "", notes: "" },
      { name: "Climate Control", status: "", notes: "" },
      { name: "Safety Features", status: "", notes: "" },
    ],
  },
  {
    category: "Mechanical",
    items: [
      { name: "Engine", status: "", notes: "" },
      { name: "Transmission", status: "", notes: "" },
      { name: "Brakes", status: "", notes: "" },
      { name: "Suspension", status: "", notes: "" },
      { name: "Steering", status: "", notes: "" },
    ],
  },
];

export default function VehicleInspectionForm() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Vehicle Inspection Report</h2>
        <p className="text-gray-600">Complete the inspection checklist below</p>
      </div>

      <div className="grid gap-6">
        {inspectionCategories.map((category) => (
          <Card key={category.category} className="p-6">
            <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
            <div className="space-y-6">
              {category.items.map((item) => (
                <div key={item.name} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{item.name}</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`${item.name}-pass`} />
                        <Label htmlFor={`${item.name}-pass`}>Pass</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id={`${item.name}-fail`} />
                        <Label htmlFor={`${item.name}-fail`}>Fail</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id={`${item.name}-warning`} />
                        <Label htmlFor={`${item.name}-warning`}>Warning</Label>
                      </div>
                    </div>
                  </div>
                  <Textarea
                    placeholder={`Notes about ${item.name.toLowerCase()}...`}
                    className="h-20"
                  />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Inspector Name</Label>
          <Input placeholder="Enter inspector's name" />
        </div>

        <div className="space-y-2">
          <Label>Additional Notes</Label>
          <Textarea
            placeholder="Any additional notes or observations..."
            className="h-32"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Save as Draft</Button>
        <Button>Submit Report</Button>
      </div>
    </div>
  );
}
