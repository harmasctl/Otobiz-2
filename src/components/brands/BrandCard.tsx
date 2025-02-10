interface BrandCardProps {
  brand: string;
  modelCount: number;
  logo: string;
}

export default function BrandCard({ brand, modelCount, logo }: BrandCardProps) {
  return (
    <div className="p-6 rounded-lg border bg-white hover:shadow-lg transition-shadow cursor-pointer">
      <img src={logo} alt={brand} className="w-16 h-16 mb-4" />
      <h3 className="font-semibold mb-1">{brand}</h3>
      <p className="text-sm text-gray-600">{modelCount} models</p>
    </div>
  );
}
