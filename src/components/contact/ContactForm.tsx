import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  return (
    <Card className="p-6">
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input placeholder="Enter your first name" required />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input placeholder="Enter your last name" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" placeholder="Enter your email address" required />
        </div>

        <div className="space-y-2">
          <Label>Subject</Label>
          <Input placeholder="Enter message subject" required />
        </div>

        <div className="space-y-2">
          <Label>Message</Label>
          <Textarea
            placeholder="Enter your message"
            className="h-32"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </Card>
  );
}
