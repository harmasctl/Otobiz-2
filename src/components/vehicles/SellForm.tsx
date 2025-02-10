import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

export default function SellForm() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg border">
      <h2 className="text-2xl font-bold mb-6">List Your Vehicle</h2>

      <div className="space-y-6">
        {/* Vehicle Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Make</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
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
                <SelectItem value="3-series">3 Series</SelectItem>
                <SelectItem value="5-series">5 Series</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Year</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
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

          <div className="space-y-2">
            <Label>Mileage</Label>
            <Input type="number" placeholder="Enter mileage" />
          </div>
        </div>

        {/* Price and Condition */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Price</Label>
            <Input type="number" placeholder="Enter price" />
          </div>

          <div className="space-y-2">
            <Label>Condition</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Describe your vehicle (features, condition, history, etc.)"
            className="h-32"
          />
        </div>

        {/* Images */}
        <div className="space-y-2">
          <Label>Photos</Label>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Upload up to 8 photos. First photo will be the main image.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-semibold">Contact Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="Your phone number" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Location</Label>
              <Input placeholder="Your location" />
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <Button className="w-full" size="lg">
            List Vehicle
          </Button>
          <p className="text-sm text-gray-600 text-center">
            By listing your vehicle, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
