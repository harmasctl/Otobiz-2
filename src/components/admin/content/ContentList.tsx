import { useState } from "react";
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
import { Edit2, Eye, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { ContentItem } from "./ContentEditor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ContentListProps {
  items: ContentItem[];
  onEdit: (item: ContentItem) => void;
  onDelete: (id: string) => void;
  onView: (item: ContentItem) => void;
  onNew: () => void;
}

export default function ContentList({
  items,
  onEdit,
  onDelete,
  onView,
  onNew,
}: ContentListProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState<"date" | "title" | "type">("date");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "published"
        ? item.status === "published"
        : item.status === "draft");
    return matchesSearch && matchesFilter;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "secondary";
      default:
        return "default";
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "page":
        return "default";
      case "blog":
        return "secondary";
      case "faq":
        return "outline";
      case "policy":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedItems.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Handle bulk actions
                  // Import toast from ui/use-toast if needed
                  console.log(
                    "Bulk action",
                    `${selectedItems.length} items selected`,
                  );
                }}
              >
                Bulk Actions
              </Button>
            </div>
          )}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="border rounded-md px-3 py-2"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "published" | "draft")
            }
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <Button onClick={onNew}>
          <Plus className="w-4 h-4 mr-2" />
          New Content
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <Badge variant={getTypeBadgeVariant(item.type)}>
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(item.lastModified || "").toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(item)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(item)}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(item.id!)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
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
