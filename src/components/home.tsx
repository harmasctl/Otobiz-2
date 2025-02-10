import SearchHero from "./search/SearchHero";
import VehicleCard from "./vehicles/VehicleCard";
import CategoryCard from "./categories/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import CompareDrawer from "./vehicles/CompareDrawer";
import CompareVehicles from "./vehicles/CompareVehicles";
import { Car, Truck, Zap } from "lucide-react";

const mockVehicles = [
  {
    id: "1",
    make: "BMW",
    model: "3 Series M Sport",
    year: 2024,
    price: {
      cash: 45000,
      monthly: {
        amount: 599,
        deposit: 4500,
        term: 48,
      },
    },
    mileage: 0,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    location: "Dakar, Senegal",
    fuelType: "Hybrid",
    transmission: "Automatic",
    condition: "New",
  },
  {
    id: "2",
    make: "Mercedes",
    model: "C-Class AMG Line",
    year: 2024,
    price: {
      cash: 52000,
      monthly: {
        amount: 699,
        deposit: 5200,
        term: 48,
      },
    },
    mileage: 1000,
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982",
    location: "Dakar, Senegal",
    fuelType: "Petrol",
    transmission: "Automatic",
    condition: "Used",
  },
  {
    id: "3",
    make: "Audi",
    model: "Q5 S-Line",
    year: 2023,
    price: {
      cash: 48000,
      monthly: {
        amount: 649,
        deposit: 4800,
        term: 48,
      },
    },
    mileage: 5000,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
    location: "Dakar, Senegal",
    fuelType: "Diesel",
    transmission: "Automatic",
    condition: "Used",
  },
  {
    id: "4",
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    price: {
      cash: 55000,
      monthly: {
        amount: 749,
        deposit: 5500,
        term: 48,
      },
    },
    mileage: 0,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399",
    location: "Dakar, Senegal",
    fuelType: "Electric",
    transmission: "Automatic",
    condition: "New",
  },
];

const categories = [
  {
    title: "Luxury Sedans",
    count: 234,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    icon: <Car className="h-6 w-6 text-white" />,
  },
  {
    title: "SUVs & Crossovers",
    count: 189,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
    icon: <Car className="h-6 w-6 text-white" />,
  },
  {
    title: "Electric Vehicles",
    count: 56,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399",
    icon: <Zap className="h-6 w-6 text-white" />,
  },
  {
    title: "Commercial Vehicles",
    count: 78,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7",
    icon: <Truck className="h-6 w-6 text-white" />,
  },
];

function Home() {
  const {
    compareVehicles,
    setCompareVehicles,
    showCompareDrawer,
    setShowCompareDrawer,
    showCompareModal,
    setShowCompareModal,
  } = useApp();

  const handleCompare = (vehicle: any) => {
    if (compareVehicles.length < 3) {
      setCompareVehicles([...compareVehicles, vehicle]);
      setShowCompareDrawer(true);
    }
  };

  const handleRemoveCompare = (id: string) => {
    setCompareVehicles(compareVehicles.filter((v) => v.id !== id));
    if (compareVehicles.length <= 1) {
      setShowCompareDrawer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHero />

      {/* Featured Vehicles */}
      <section className="container py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Featured Vehicles</h2>
            <p className="text-gray-600">Handpicked deals you'll love</p>
          </div>
          <Button variant="outline">View all</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              {...vehicle}
              onCompare={() => handleCompare(vehicle)}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
            <p className="text-gray-600">Find your perfect vehicle type</p>
          </div>
          <Button variant="outline">View all categories</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Otobiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Senegal's leading vehicle marketplace platform, providing a
              seamless experience for buying and selling cars.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚗",
                title: "Extensive Selection",
                description:
                  "Access to thousands of verified vehicles from trusted sellers across Senegal",
              },
              {
                icon: "🔒",
                title: "Secure Transactions",
                description:
                  "Safe and transparent buying process with verified sellers and secure payment options",
              },
              {
                icon: "💬",
                title: "Direct Communication",
                description:
                  "Connect directly with sellers through our built-in chat and calling features",
              },
              {
                icon: "📱",
                title: "Mobile First",
                description:
                  "Access all features on the go with our mobile app for iOS and Android",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-lg group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to find your perfect vehicle or sell your current
              one.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Search & Compare",
                description:
                  "Browse through our extensive collection of vehicles and compare your favorites",
              },
              {
                step: "02",
                title: "Connect & Verify",
                description:
                  "Connect with sellers, verify vehicle details, and schedule viewings",
              },
              {
                step: "03",
                title: "Deal & Drive",
                description:
                  "Complete the transaction securely and drive away in your new vehicle",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute -top-8 -left-8 text-[120px] font-bold text-gray-100 opacity-50 group-hover:opacity-75 transition-all duration-300 group-hover:scale-110">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
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
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>

      {showCompareDrawer && (
        <CompareDrawer
          vehicles={compareVehicles}
          onRemove={handleRemoveCompare}
          onClose={() => setShowCompareDrawer(false)}
          onCompare={() => {
            setShowCompareModal(true);
            setShowCompareDrawer(false);
          }}
        />
      )}

      {showCompareModal && (
        <CompareVehicles
          vehicles={compareVehicles}
          onClose={() => setShowCompareModal(false)}
        />
      )}
    </div>
  );
}

export default Home;
