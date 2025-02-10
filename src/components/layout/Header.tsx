import { Button } from "@/components/ui/button";
import { Bell, Heart, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const navigate = useNavigate();
  const { user, setShowAuthModal, logout } = useApp();

  return (
    <header className="bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Otobiz
        </Link>
        <div className="flex items-center gap-8">
          <nav className="flex gap-6">
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => navigate("/search")}
            >
              Buy
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => navigate("/sell")}
            >
              Sell
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => navigate("/finance")}
            >
              Finance
            </Button>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-orange-500 text-white hover:bg-orange-600"
                  >
                    <span className="text-sm">👤</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/favorites")}>
                    Favorites
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-orange-500 text-white hover:bg-orange-600"
                onClick={() => setShowAuthModal(true)}
              >
                <span className="text-sm">👤</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
