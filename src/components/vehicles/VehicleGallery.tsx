import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VehicleGalleryProps {
  images: string[];
  make: string;
  model: string;
}

export default function VehicleGallery({
  images,
  make,
  model,
}: VehicleGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setSelectedImage(images[(currentImageIndex + 1) % images.length]);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setSelectedImage(
      images[(currentImageIndex - 1 + images.length) % images.length],
    );
  };

  return (
    <>
      <div className="space-y-4">
        <div className="relative group">
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <img
              src={selectedImage}
              alt={`${make} ${model}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="icon"
              onClick={prevImage}
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setShowFullscreen(true)}
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={nextImage}
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImage(image);
                setCurrentImageIndex(index);
              }}
              className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-gray-200"}`}
            >
              <img
                src={image}
                alt={`${make} ${model} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogContent className="max-w-7xl">
          <div className="relative aspect-video">
            <img
              src={selectedImage}
              alt={`${make} ${model}`}
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-4 flex items-center justify-between">
              <Button
                variant="secondary"
                size="icon"
                onClick={prevImage}
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={nextImage}
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-2 mt-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(image);
                  setCurrentImageIndex(index);
                }}
                className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-gray-200"}`}
              >
                <img
                  src={image}
                  alt={`${make} ${model} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
