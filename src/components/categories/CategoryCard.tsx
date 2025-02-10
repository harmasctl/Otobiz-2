interface CategoryCardProps {
  title: string;
  count: number;
  image: string;
  icon?: React.ReactNode;
}

export default function CategoryCard({
  title,
  count,
  image,
  icon,
}: CategoryCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg group cursor-pointer hover:shadow-xl transition-all duration-300">
      {/* Background Image with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/80">
              {count.toLocaleString()} vehicles
            </span>
            <span className="text-white/60">•</span>
            <span className="text-sm text-white/80 group-hover:text-white transition-colors">
              View All
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
