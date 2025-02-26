import SearchHero from "@/components/search/SearchHero";
import CategoryBrowser from "@/components/sections/CategoryBrowser";
import FeaturedListings from "@/components/sections/FeaturedListings";
import PopularBrands from "@/components/sections/PopularBrands";
import HowItWorks from "@/components/sections/HowItWorks";
import CustomerReviews from "@/components/sections/CustomerReviews";
import LatestNews from "@/components/sections/LatestNews";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SearchHero />
      <FeaturedListings />
      <CategoryBrowser />
      <PopularBrands />
      <HowItWorks />
      <CustomerReviews />
      <LatestNews />
    </div>
  );
}
