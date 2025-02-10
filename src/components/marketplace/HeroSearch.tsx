import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Car, Gauge, Calendar, Filter } from "lucide-react";

export default function HeroSearch() {
  const [selectedMake, setSelectedMake] = useState<string>();

  return (
    <div className="relative bg-[#0F172A] py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 w-1/2 bg-black/10 transform -skew-x-12" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
      </div>

      <div className="container relative grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8 items-center">
        <div className="text-white space-y-6">
          <div>
            <h1 className="text-6xl font-bold mb-4 leading-tight">
              FIND YOUR
              <br />
              PERFECT <span className="bg-white text-[#0F172A] px-2">CAR</span>
            </h1>
            <p className="text-xl opacity-90">
              Over 435,926 deals available today
            </p>
          </div>

          {/* Car Image with Creative Layout */}
          <div className="relative h-[400px] w-full mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-transparent to-[#0F172A]/50 z-10" />
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <div className="relative h-full">
                <img
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
                  alt="Luxury Car"
                  className="w-full h-full object-cover object-center transform scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
            {/* Quick Stats */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Calendar, label: "Latest Models", value: "2024" },
                  { icon: Gauge, label: "Available Cars", value: "1,234" },
                  { icon: MapPin, label: "Locations", value: "15+ Cities" },
                  { icon: Filter, label: "Brands", value: "25+" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors"
                  >
                    <stat.icon className="w-5 h-5 mb-2 text-white/80" />
                    <div className="text-sm text-white/60">{stat.label}</div>
                    <div className="text-lg font-semibold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-2xl w-full">
          <h2 className="text-xl font-semibold mb-6">Quick Search</h2>
          <div className="space-y-6">
            <Select>
              <SelectTrigger className="bg-gray-50">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bmw">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    <span>BMW</span>
                  </div>
                </SelectItem>
                <SelectItem value="mercedes">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    <span>Mercedes</span>
                  </div>
                </SelectItem>
                <SelectItem value="audi">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    <span>Audi</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-gray-50">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Model</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full bg-[#1E1E1E] hover:bg-[#2E2E2E]">
                Cash
              </Button>
              <Button variant="outline" className="w-full">
                Finance
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Min price" className="bg-gray-50" />
              <Input placeholder="Max price" className="bg-gray-50" />
            </div>

            <Button className="w-full bg-[#FF0033] hover:bg-[#E60000] h-12 text-lg">
              <Search className="w-5 h-5 mr-2" />
              Search Cars
            </Button>

            <div className="flex justify-between text-sm">
              <Button variant="link" className="text-[#FF0033] p-0 h-auto">
                Reset filters
              </Button>
              <Button variant="link" className="text-[#FF0033] p-0 h-auto">
                Advanced search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
