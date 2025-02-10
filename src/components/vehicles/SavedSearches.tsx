import { Button } from "@/components/ui/button";
import { Bell, Edit2, Trash2 } from "lucide-react";

interface SavedSearch {
  id: string;
  name: string;
  criteria: {
    make?: string;
    model?: string;
    minPrice?: number;
    maxPrice?: number;
    minYear?: number;
    maxYear?: number;
  };
  notificationsEnabled: boolean;
}

const mockSavedSearches: SavedSearch[] = [
  {
    id: "1",
    name: "BMW 3 Series",
    criteria: {
      make: "BMW",
      model: "3 Series",
      minPrice: 20000,
      maxPrice: 50000,
      minYear: 2020,
    },
    notificationsEnabled: true,
  },
];

export default function SavedSearches() {
  return (
    <div className="space-y-4">
      {mockSavedSearches.map((search) => (
        <div
          key={search.id}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{search.name}</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={search.notificationsEnabled ? "text-primary" : ""}
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {Object.entries(search.criteria).map(([key, value]) => (
              <div key={key}>
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}:
                </span>{" "}
                <span className="font-medium">
                  {typeof value === "number" &&
                    (key.includes("price")
                      ? `£${value.toLocaleString()}`
                      : value)}
                  {typeof value === "string" && value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Button className="w-full">View Results</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
