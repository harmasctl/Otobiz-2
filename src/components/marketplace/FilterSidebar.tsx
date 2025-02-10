import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function FilterSidebar() {
  return (
    <div className="w-full max-w-xs space-y-6 p-6 bg-white rounded-lg border">
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[0, 100000]}
            max={100000}
            step={1000}
            className="mb-6"
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Price</Label>
              <Input type="number" placeholder="£0" />
            </div>
            <div className="space-y-2">
              <Label>Max Price</Label>
              <Input type="number" placeholder="£100,000" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Vehicle Type</h3>
        <div className="space-y-2">
          {[
            "SUV",
            "Sedan",
            "Hatchback",
            "Coupe",
            "Convertible",
            "Electric",
          ].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={type} />
              <label
                htmlFor={type}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Make</h3>
        <div className="space-y-2">
          {[
            "BMW",
            "Mercedes-Benz",
            "Audi",
            "Toyota",
            "Honda",
            "Volkswagen",
          ].map((make) => (
            <div key={make} className="flex items-center space-x-2">
              <Checkbox id={make} />
              <label
                htmlFor={make}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {make}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 space-y-4">
        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
