import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VehicleGalleryProps {
  images?: string[];
}

export default function VehicleGallery({ images = [] }: VehicleGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <Card className="aspect-video bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <img
          src={images[currentImage]}
          alt={`Vehicle image ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`aspect-video rounded-lg overflow-hidden ${currentImage === index ? "ring-2 ring-primary" : ""}`}
            >
              <img
                src={image}
                alt={`Vehicle thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
