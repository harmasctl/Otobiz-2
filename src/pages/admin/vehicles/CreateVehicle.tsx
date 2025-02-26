import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

export default function CreateVehicle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: `${formData.get("year")} ${formData.get("make")} ${formData.get("model")}`,
      make: formData.get("make") as string,
      model: formData.get("model") as string,
      year: Number(formData.get("year")),
      price: Number(formData.get("price")),
      mileage: Number(formData.get("mileage")),
      fuel_type: formData.get("fuelType") as string,
      transmission: formData.get("transmission") as string,
      body_type: formData.get("bodyType") as string,
      color: formData.get("color") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      condition: formData.get("condition") as "new" | "used" | "certified",
      main_image: "https://images.unsplash.com/photo-1555215695-3004980ad54e", // Placeholder
      images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e"], // Placeholder
      status: "active",
    };

    try {
      const { error } = await supabase.from("vehicles").insert([data]);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Vehicle created successfully",
      });
      navigate("/admin/vehicles");
    } catch (error) {
      console.error("Error creating vehicle:", error);
      toast({
        title: "Error",
        description: "Failed to create vehicle",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Make</Label>
            <Select name="make">
              <SelectTrigger>
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="mercedes">Mercedes</SelectItem>
                <SelectItem value="audi">Audi</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Model</Label>
            <Input name="model" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Year</Label>
            <Input type="number" name="year" min="1900" max="2024" required />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input type="number" name="price" min="0" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Mileage</Label>
            <Input type="number" name="mileage" min="0" required />
          </div>

          <div className="space-y-2">
            <Label>Fuel Type</Label>
            <Select name="fuelType">
              <SelectTrigger>
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Transmission</Label>
            <Select name="transmission">
              <SelectTrigger>
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automatic">Automatic</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Body Type</Label>
            <Select name="bodyType">
              <SelectTrigger>
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="hatchback">Hatchback</SelectItem>
                <SelectItem value="coupe">Coupe</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Color</Label>
            <Input name="color" required />
          </div>

          <div className="space-y-2">
            <Label>Condition</Label>
            <Select name="condition">
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="certified">Certified Pre-Owned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <Input name="location" required />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            name="description"
            className="h-32"
            placeholder="Describe your vehicle..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Images</Label>
          <Input type="file" multiple accept="image/*" />
          <p className="text-sm text-gray-600">
            You can upload multiple images. First image will be the main image.
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Vehicle"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
