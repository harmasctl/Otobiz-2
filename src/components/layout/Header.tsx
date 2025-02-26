import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Car } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Car className="h-6 w-6" />
          <span className="text-xl font-bold">Otobiz</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Button variant="ghost" onClick={() => navigate("/marketplace")}>
            Marketplace
          </Button>
          <Button variant="ghost" onClick={() => navigate("/sell")}>
            Sell
          </Button>
          <Button variant="ghost" onClick={() => navigate("/about")}>
            About
          </Button>
          <Button variant="ghost" onClick={() => navigate("/contact")}>
            Contact
          </Button>
        </nav>
      </div>
    </header>
  );
}
