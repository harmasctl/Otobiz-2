import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <span className="text-4xl mb-4 block">✉️</span>
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-gray-600">
            Subscribe to our newsletter for the latest car deals, automotive
            news, and exclusive offers.
          </p>
        </div>
        <form className="flex gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
