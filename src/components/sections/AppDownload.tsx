import { Button } from "@/components/ui/button";

export default function AppDownload() {
  return (
    <section className="bg-[#0F172A] py-16">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-white">
          <h2 className="text-3xl font-bold mb-4">Download Our Mobile App</h2>
          <p className="text-gray-300 mb-8">
            Get the best car deals right in your pocket. Browse, compare, and
            contact sellers on the go.
          </p>
          <div className="flex gap-4">
            <Button className="bg-white text-black hover:bg-gray-100">
              <span className="mr-2">🍎</span>
              App Store
            </Button>
            <Button className="bg-white text-black hover:bg-gray-100">
              <span className="mr-2">🤖</span>
              Google Play
            </Button>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1616469829581-73993eb86b02"
            alt="Mobile app preview"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
