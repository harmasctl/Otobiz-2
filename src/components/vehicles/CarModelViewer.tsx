interface CarModelViewerProps {
  modelUrl: string;
  className?: string;
}

export default function CarModelViewer({
  modelUrl,
  className = "",
}: CarModelViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <model-viewer
        src={modelUrl}
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
        }}
        camera-orbit="45deg 55deg 2.5m"
        exposure="0.5"
        environment-image="neutral"
      ></model-viewer>
    </div>
  );
}
