import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Image, Tag, Grid } from "lucide-react";

export default function ContentManagement() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Content Management</h1>
            <p className="text-gray-600">Manage website content and assets</p>
          </div>
        </div>

        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pages">
              <FileText className="w-4 h-4 mr-2" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="media">
              <Image className="w-4 h-4 mr-2" />
              Media
            </TabsTrigger>
            <TabsTrigger value="categories">
              <Tag className="w-4 h-4 mr-2" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="brands">
              <Grid className="w-4 h-4 mr-2" />
              Brands
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Static Pages</h2>
                <Button>Add New Page</Button>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Home", url: "/", lastModified: "2024-02-10" },
                  {
                    title: "About Us",
                    url: "/about",
                    lastModified: "2024-02-08",
                  },
                  {
                    title: "Contact",
                    url: "/contact",
                    lastModified: "2024-02-05",
                  },
                  {
                    title: "Privacy Policy",
                    url: "/privacy",
                    lastModified: "2024-01-15",
                  },
                  {
                    title: "Terms of Service",
                    url: "/terms",
                    lastModified: "2024-01-15",
                  },
                ].map((page) => (
                  <div
                    key={page.url}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-gray-600">{page.url}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-600">
                        Last modified:{" "}
                        {new Date(page.lastModified).toLocaleDateString()}
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Media Library</h2>
                <Button>Upload Media</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                  >
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Vehicle Categories</h2>
                <Button>Add Category</Button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "SUV", count: 156 },
                  { name: "Sedan", count: 234 },
                  { name: "Electric", count: 89 },
                  { name: "Luxury", count: 167 },
                ].map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-gray-600">
                        {category.count} vehicles
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="brands" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Vehicle Brands</h2>
                <Button>Add Brand</Button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "BMW", count: 89 },
                  { name: "Mercedes-Benz", count: 112 },
                  { name: "Audi", count: 76 },
                  { name: "Toyota", count: 156 },
                ].map((brand) => (
                  <div
                    key={brand.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{brand.name}</div>
                      <div className="text-sm text-gray-600">
                        {brand.count} vehicles
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
