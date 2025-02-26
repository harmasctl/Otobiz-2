import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { useVehicleStore } from "@/store/useVehicleStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function VehicleManagement() {
  const navigate = useNavigate();
  const { vehicles, isLoading, fetchVehicles, deleteVehicle } =
    useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      await deleteVehicle(id);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Vehicle Management</h2>
          <p className="text-gray-600">Manage your vehicle listings</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input placeholder="Search vehicles..." className="w-64" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button onClick={() => navigate("/admin/vehicles/new")}>
            <Plus className="w-4 h-4 mr-2" /> Add Vehicle
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src={vehicle.mainImage}
                      alt={vehicle.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{vehicle.title}</div>
                      <div className="text-sm text-gray-600">
                        {vehicle.make} {vehicle.model}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>£{vehicle.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      vehicle.status === "active" ? "success" : "secondary"
                    }
                  >
                    {vehicle.status}
                  </Badge>
                </TableCell>
                <TableCell>{vehicle.location}</TableCell>
                <TableCell>
                  {new Date(vehicle.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/admin/vehicles/edit/${vehicle.id}`)
                        }
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(vehicle.id)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
