import { Button } from "@/components/ui/button";

interface Make {
  name: string;
  logo: string;
}

const makes: Make[] = [
  {
    name: "BMW",
    logo: "https://cdn.worldvectorlogo.com/logos/bmw-2.svg",
  },
  {
    name: "Mercedes",
    logo: "https://cdn.worldvectorlogo.com/logos/mercedes-benz-2.svg",
  },
  {
    name: "Audi",
    logo: "https://cdn.worldvectorlogo.com/logos/audi-13.svg",
  },
  {
    name: "Toyota",
    logo: "https://cdn.worldvectorlogo.com/logos/toyota.svg",
  },
  {
    name: "Honda",
    logo: "https://cdn.worldvectorlogo.com/logos/honda.svg",
  },
  {
    name: "VW",
    logo: "https://cdn.worldvectorlogo.com/logos/volkswagen-2.svg",
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
            onError={(e) => {
              // Fallback to text if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement?.insertAdjacentHTML(
                "afterbegin",
                `<span class="font-semibold text-sm">${make.name[0]}</span>`,
              );
            }}
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
