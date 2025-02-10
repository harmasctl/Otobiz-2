import { Button } from "@/components/ui/button";

interface Make {
  name: string;
  logo: string;
}

const makes: Make[] = [
  {
    name: "BMW",
    logo: "https://www.freepnglogos.com/uploads/bmw-png-logo/bmw-png-logo-vector-0.png",
  },
  {
    name: "Mercedes",
    logo: "https://www.freepnglogos.com/uploads/mercedes-logo-png/mercedes-benz-logo-png-transparent-0.png",
  },
  {
    name: "Audi",
    logo: "https://www.freepnglogos.com/uploads/audi-logo-png/audi-logo-png-rings-brand-0.png",
  },
  {
    name: "Toyota",
    logo: "https://www.freepnglogos.com/uploads/toyota-logo-png/toyota-logos-brands-10.png",
  },
  {
    name: "Honda",
    logo: "https://www.freepnglogos.com/uploads/honda-logo-png/honda-logo-png-0.png",
  },
  {
    name: "VW",
    logo: "https://www.freepnglogos.com/uploads/vw-png-logo/volkswagen-vw-png-logo-0.png",
  },
];

interface MakeSelectorProps {
  onSelect: (make: string) => void;
  selectedMake?: string;
}

export default function MakeSelector({
  onSelect,
  selectedMake,
}: MakeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {makes.map((make) => (
        <Button
          key={make.name}
          variant={selectedMake === make.name ? "default" : "outline"}
          className={`
            flex items-center gap-2 h-10 px-3
            ${selectedMake === make.name ? "bg-[#FF0033] hover:bg-[#E60000]" : "hover:border-[#FF0033] hover:text-[#FF0033]"}
          `}
          onClick={() => onSelect(make.name)}
        >
          <img
            src={make.logo}
            alt={make.name}
            className={`w-6 h-6 object-contain ${selectedMake === make.name ? "brightness-0 invert" : ""}`}
          />
          <span
            className={`text-sm font-medium ${selectedMake === make.name ? "text-white" : ""}`}
          >
            {make.name}
          </span>
        </Button>
      ))}
    </div>
  );
}
