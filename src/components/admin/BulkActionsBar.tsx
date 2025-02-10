import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function BulkActionsBar() {
  return (
    <div className="bg-white border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Checkbox id="select-all" />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select All
          </label>
          <span className="text-sm text-gray-600">(3 items selected)</span>
        </div>

        <div className="flex items-center space-x-4">
          <select className="border rounded-md px-3 py-2 text-sm">
            <option>Bulk Actions</option>
            <option>Approve Selected</option>
            <option>Reject Selected</option>
            <option>Delete Selected</option>
          </select>

          <Button size="sm" variant="outline">
            Archive
          </Button>
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
