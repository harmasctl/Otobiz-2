import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, MoreHorizontal, Search } from "lucide-react";

interface Listing {
  id: string;
  title: string;
  seller: string;
  price: number;
  status: "pending" | "active" | "sold" | "rejected";
  createdAt: string;
  views: number;
  inquiries: number;
}

const mockListings: Listing[] = [
  {
    id: "1",
    title: "2024 BMW 3 Series",
    seller: "Premium Motors",
    price: 45000,
    status: "active",
    createdAt: "2024-02-01",
    views: 234,
    inquiries: 12,
  },
  {
    id: "2",
    title: "2023 Mercedes C-Class",
    seller: "Luxury Cars Ltd",
    price: 52000,
    status: "pending",
    createdAt: "2024-02-09",
    views: 156,
    inquiries: 8,
  },
];

export default function ListingsManagement() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Listings Management</h1>
            <p className="text-gray-600">
              Manage and moderate vehicle listings
            </p>
          </div>
          <Button>
            <Eye className="w-4 h-4 mr-2" />
            View All Listings
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search listings..." className="pl-10" />
          </div>
          <select className="border rounded-md px-3 py-2">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Sold</option>
            <option>Rejected</option>
          </select>
          <select className="border rounded-md px-3 py-2">
            <option>Sort: Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Viewed</option>
          </select>
        </div>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Listed Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Inquiries</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium">{listing.title}</TableCell>
                  <TableCell>{listing.seller}</TableCell>
                  <TableCell>£{listing.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        listing.status === "active"
                          ? "success"
                          : listing.status === "pending"
                            ? "warning"
                            : listing.status === "rejected"
                              ? "destructive"
                              : "secondary"
                      }
                    >
                      {listing.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{listing.views.toLocaleString()}</TableCell>
                  <TableCell>{listing.inquiries}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
