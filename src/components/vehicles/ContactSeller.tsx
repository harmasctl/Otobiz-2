import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, Mail } from "lucide-react";

export default function ContactSeller() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=1"
            alt="Seller"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">Premium Motors</h3>
          <p className="text-sm text-gray-600">Member since 2020</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button className="flex-1">
            <MessageCircle className="w-4 h-4 mr-2" /> Message
          </Button>
          <Button variant="outline">
            <Phone className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <Input placeholder="Your name" />
          <Input type="email" placeholder="Your email" />
          <Input type="tel" placeholder="Your phone (optional)" />
          <Textarea
            placeholder="I'm interested in this vehicle. Please contact me with more information."
            className="h-32"
          />
          <Button className="w-full">
            <Mail className="w-4 h-4 mr-2" /> Send Message
          </Button>
        </div>
      </div>
    </Card>
  );
}
