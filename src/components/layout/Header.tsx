import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, User, Settings, Store, ShieldCheck, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/AppContext";
import NotificationCenter from "../notifications/NotificationCenter";

interface HeaderProps {
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

export default function Header({
  showAuthModal,
  setShowAuthModal,
}: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useApp();

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
          {user?.role === "admin" && (
            <Button variant="ghost" onClick={() => navigate("/admin")}>
              Admin
            </Button>
          )}
          {user && (
            <Button variant="ghost" onClick={() => navigate("/seller")}>
              Seller Dashboard
            </Button>
          )}
          {user ? (
            <div className="flex items-center gap-4">
              <NotificationCenter />
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.full_name || "User"}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                          {(user.full_name || "U")[0]}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.full_name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    {user.role === "seller" && (
                      <DropdownMenuItem onClick={() => navigate("/seller")}>
                        <Store className="mr-2 h-4 w-4" />
                        Seller Dashboard
                      </DropdownMenuItem>
                    )}
                    {user.role === "admin" && (
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <Button onClick={() => setShowAuthModal(true)}>Login</Button>
          )}
        </nav>
      </div>
    </header>
  );
}
