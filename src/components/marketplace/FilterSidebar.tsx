import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useVehicleStore } from "@/store/useVehicleStore";

export default function FilterSidebar() {
  const { filters, setFilters, clearFilters } = useVehicleStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold">Price Range</h3>
        <div className="space-y-2">
          <Slider
            defaultValue={[0, 100000]}
            min={0}
            max={100000}
            step={1000}
            onValueChange={(value) => {
              setFilters({
                minPrice: value[0],
                maxPrice: value[1],
              });
            }}
          />
          <div className="flex justify-between">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
              className="w-24"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
              className="w-24"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Year</h3>
        <div className="space-y-2">
          <Slider
            defaultValue={[2000, 2024]}
            min={2000}
            max={2024}
            step={1}
            onValueChange={(value) => {
              setFilters({
                minYear: value[0],
                maxYear: value[1],
              });
            }}
          />
          <div className="flex justify-between">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minYear || ""}
              onChange={(e) => setFilters({ minYear: Number(e.target.value) })}
              className="w-24"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxYear || ""}
              onChange={(e) => setFilters({ maxYear: Number(e.target.value) })}
              className="w-24"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Mileage</h3>
        <div className="space-y-2">
          <Slider
            defaultValue={[0, 100000]}
            min={0}
            max={100000}
            step={1000}
            onValueChange={(value) => {
              setFilters({
                minMileage: value[0],
                maxMileage: value[1],
              });
            }}
          />
          <div className="flex justify-between">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minMileage || ""}
              onChange={(e) =>
                setFilters({ minMileage: Number(e.target.value) })
              }
              className="w-24"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxMileage || ""}
              onChange={(e) =>
                setFilters({ maxMileage: Number(e.target.value) })
              }
              className="w-24"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => clearFilters()}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
