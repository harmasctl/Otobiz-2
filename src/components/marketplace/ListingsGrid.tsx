import ListingCard from "./ListingCard";
import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";

const mockListings = [
  {
    id: "1",
    title: "BMW 3 Series M Sport",
    price: 45000,
    location: "Dakar, Senegal",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    specs: {
      year: 2024,
      mileage: 0,
      transmission: "Automatic",
      fuelType: "Hybrid",
    },
  },
  {
    id: "2",
    title: "Mercedes-Benz C-Class AMG Line",
    price: 52000,
    location: "Dakar, Senegal",
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982",
    specs: {
      year: 2024,
      mileage: 1000,
      transmission: "Automatic",
      fuelType: "Petrol",
    },
  },
];

export default function ListingsGrid() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Available Vehicles</h2>
          <p className="text-gray-600">Found {mockListings.length} vehicles</p>
        </div>

        <div className="flex items-center gap-4">
          <select className="border rounded-md px-3 py-2">
            <option>Sort: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockListings.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
