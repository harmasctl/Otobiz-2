import FilterSidebar from "@/components/marketplace/FilterSidebar";
import ListingsGrid from "@/components/marketplace/ListingsGrid";
import SearchHero from "@/components/marketplace/HeroSearch";

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHero />

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
          <aside>
            <FilterSidebar />
          </aside>
          <main>
            <ListingsGrid />
          </main>
        </div>
      </div>
    </div>
  );
}
