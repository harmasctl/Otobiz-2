import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface WishlistButtonProps {
  vehicleId: string;
  className?: string;
}

export default function WishlistButton({
  vehicleId,
  className = "",
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { setShowAuthModal } = useApp();

  const handleClick = () => {
    // If user is not logged in, show auth modal
    if (!localStorage.getItem("user")) {
      setShowAuthModal(true);
      return;
    }

    setIsInWishlist(!isInWishlist);
    // Here you would typically make an API call to add/remove from wishlist
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className={`h-8 w-8 ${className} ${isInWishlist ? "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700" : ""}`}
      onClick={handleClick}
    >
      <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
    </Button>
  );
}
