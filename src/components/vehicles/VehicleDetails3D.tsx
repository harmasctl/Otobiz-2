import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

interface VehicleDetails3DProps {
  modelUrl: string;
  images: string[];
  onClose?: () => void;
}

export default function VehicleDetails3D({
  modelUrl,
  images,
  onClose,
}: VehicleDetails3DProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentView, setCurrentView] = useState<
    "3d" | "interior" | "exterior"
  >("3d");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className={`bg-white ${isFullscreen ? "fixed inset-0 z-50" : "relative"}`}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <Tabs
          value={currentView}
          onValueChange={(v) => setCurrentView(v as any)}
        >
          <TabsList>
            <TabsTrigger value="3d">3D View</TabsTrigger>
            <TabsTrigger value="exterior">Exterior</TabsTrigger>
            <TabsTrigger value="interior">Interior</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="relative">
        {currentView === "3d" ? (
          <div className="aspect-[16/9]">
            <model-viewer
              src={modelUrl}
              camera-controls
              auto-rotate
              shadow-intensity="1"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f8f9fa",
              }}
              camera-orbit="45deg 55deg 2.5m"
              exposure="0.5"
              environment-image="neutral"
            ></model-viewer>
          </div>
        ) : (
          <div className="aspect-[16/9] relative overflow-hidden bg-gray-100">
            <img
              src={images[currentImageIndex]}
              alt={`View ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="secondary"
                size="icon"
                onClick={prevImage}
                className="rounded-full bg-white/80 backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={nextImage}
                className="rounded-full bg-white/80 backdrop-blur-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 grid grid-cols-6 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentView(index === 0 ? "exterior" : "interior");
              setCurrentImageIndex(index);
            }}
            className={`aspect-square rounded-md overflow-hidden border-2 ${currentImageIndex === index && currentView !== "3d" ? "border-primary" : "border-transparent"}`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
