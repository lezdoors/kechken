import Hero from "@/components/store/Hero";
import Marquee from "@/components/store/Marquee";
import FeaturedDrop from "@/components/store/FeaturedDrop";
import AtelierLoop from "@/components/store/AtelierLoop";
import CategoryTiles from "@/components/store/CategoryTiles";
import ProductPreview from "@/components/store/ProductPreview";
import ArtisanDossier from "@/components/store/ArtisanDossier";
import Fulfillment from "@/components/store/Fulfillment";

export default async function Home() {
  return (
    <main className="bg-[var(--color-bg)]">
      <Hero />
      <Marquee />
      <FeaturedDrop />
      <AtelierLoop />
      <CategoryTiles />
      <ProductPreview />
      <ArtisanDossier />
      <Fulfillment />
    </main>
  );
}
