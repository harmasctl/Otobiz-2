import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Otobiz</h3>
            <p className="text-gray-400">
              Your trusted vehicle marketplace for buying and selling cars.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0"
                >
                  About Us
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0"
                >
                  Contact
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0"
                >
                  Terms & Conditions
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0"
                >
                  Privacy Policy
                </Button>
              </li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0"
                >
                  SUVs
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0"
                >
                  Sedans
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0"
                >
                  Electric Vehicles
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0"
                >
                  Luxury Cars
                </Button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p className="text-gray-400">
              Subscribe to our newsletter for updates
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/10 text-white placeholder:text-gray-400"
              />
              <Button>
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 Otobiz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
