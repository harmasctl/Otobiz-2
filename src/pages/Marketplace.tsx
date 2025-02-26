import { useState } from "react";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import ListingsGrid from "@/components/marketplace/ListingsGrid";
import MapView from "@/components/marketplace/MapView";
import { Button } from "@/components/ui/button";
import { Map, Grid } from "lucide-react";

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vehicle Marketplace</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4 mr-2" /> Grid View
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            onClick={() => setViewMode("map")}
          >
            <Map className="w-4 h-4 mr-2" /> Map View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[300px,1fr] gap-8">
        <FilterSidebar />
        {viewMode === "grid" ? <ListingsGrid /> : <MapView />}
      </div>
    </div>
  );
}
