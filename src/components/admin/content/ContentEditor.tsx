import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "./RichTextEditor";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, Save, Trash2 } from "lucide-react";

interface ContentEditorProps {
  initialContent?: ContentItem;
  onSave: (content: ContentItem) => void;
  onCancel: () => void;
}

export interface ContentItem {
  id?: string;
  title: string;
  slug: string;
  type: "page" | "blog" | "faq" | "policy";
  content: string;
  status: "draft" | "published";
  featuredImage?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  publishDate?: string;
  lastModified?: string;
}

export default function ContentEditor({
  initialContent,
  onSave,
  onCancel,
}: ContentEditorProps) {
  const [content, setContent] = useState<ContentItem>(
    initialContent || {
      title: "",
      slug: "",
      type: "page",
      content: "",
      status: "draft",
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: "",
      },
    },
  );
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleSave = async () => {
    setIsDirty(false);
    // Validate required fields
    if (!content.title || !content.content) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    // Generate slug if empty
    if (!content.slug) {
      content.slug = content.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // Add timestamps
    const now = new Date().toISOString();
    if (!content.id) {
      content.publishDate = now;
    }
    content.lastModified = now;

    onSave(content);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a storage service
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent({ ...content, featuredImage: reader.result as string });
        setIsDirty(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = (value: string) => {
    setContent({ ...content, content: value });
    setIsDirty(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Edit Content</h1>
          <p className="text-gray-600">
            {content.id ? "Edit existing content" : "Create new content"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveTab("preview")}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "edit" | "preview")}
      >
        <TabsList>
          <TabsTrigger value="edit">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <Card className="p-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={content.title}
                    onChange={(e) => {
                      setContent({ ...content, title: e.target.value });
                      setIsDirty(true);
                    }}
                    placeholder="Enter title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    value={content.slug}
                    onChange={(e) => {
                      setContent({ ...content, slug: e.target.value });
                      setIsDirty(true);
                    }}
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={content.type}
                    onValueChange={(
                      value: "page" | "blog" | "faq" | "policy",
                    ) => {
                      setContent({ ...content, type: value });
                      setIsDirty(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="faq">FAQ</SelectItem>
                      <SelectItem value="policy">Policy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={content.status}
                    onValueChange={(value: "draft" | "published") => {
                      setContent({ ...content, status: value });
                      setIsDirty(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <RichTextEditor
                  value={content.content}
                  onChange={handleContentChange}
                />
              </div>

              <div className="space-y-4">
                <Label>Featured Image</Label>
                {content.featuredImage ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={content.featuredImage}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setContent({ ...content, featuredImage: undefined });
                        setIsDirty(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <div className="flex flex-col items-center gap-2">
                        <ImagePlus className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Upload image
                        </span>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">SEO Settings</h3>
                <div className="space-y-2">
                  <Label>Meta Title</Label>
                  <Input
                    value={content.seo.metaTitle}
                    onChange={(e) => {
                      setContent({
                        ...content,
                        seo: { ...content.seo, metaTitle: e.target.value },
                      });
                      setIsDirty(true);
                    }}
                    placeholder="SEO title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    value={content.seo.metaDescription}
                    onChange={(e) => {
                      setContent({
                        ...content,
                        seo: {
                          ...content.seo,
                          metaDescription: e.target.value,
                        },
                      });
                      setIsDirty(true);
                    }}
                    placeholder="SEO description"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Keywords</Label>
                  <Input
                    value={content.seo.keywords}
                    onChange={(e) => {
                      setContent({
                        ...content,
                        seo: { ...content.seo, keywords: e.target.value },
                      });
                      setIsDirty(true);
                    }}
                    placeholder="Comma-separated keywords"
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="p-6">
            <div className="prose max-w-none dark:prose-invert">
              <h1>{content.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: content.content }} />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog
        open={showUnsavedChanges}
        onOpenChange={setShowUnsavedChanges}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onCancel}>Leave</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
