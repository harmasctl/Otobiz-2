import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function VehicleFilters() {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="pt-2">
          <Slider
            defaultValue={[0, 100000]}
            max={100000}
            step={1000}
            className="mb-2"
          />
          <div className="flex gap-4">
            <Input placeholder="Min Price" type="number" />
            <Input placeholder="Max Price" type="number" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Make</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select make" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Make</SelectItem>
            <SelectItem value="bmw">BMW</SelectItem>
            <SelectItem value="mercedes">Mercedes</SelectItem>
            <SelectItem value="audi">Audi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Model</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Model</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Year</Label>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="From year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 20 }, (_, i) => 2024 - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="To year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 20 }, (_, i) => 2024 - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Fuel Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="petrol">Petrol</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
            <SelectItem value="electric">Electric</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Transmission</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select transmission" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="automatic">Automatic</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Mileage</Label>
        <div className="pt-2">
          <Slider
            defaultValue={[0, 100000]}
            max={100000}
            step={1000}
            className="mb-2"
          />
          <div className="flex gap-4">
            <Input placeholder="Min Mileage" type="number" />
            <Input placeholder="Max Mileage" type="number" />
          </div>
        </div>
      </div>

      <div className="pt-4 space-y-4">
        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  );
}
