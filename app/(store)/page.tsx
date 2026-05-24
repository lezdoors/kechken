import Hero from "@/components/store/Hero";
import Marquee from "@/components/store/Marquee";
import ObjectOfTheEdition from "@/components/store/ObjectOfTheEdition";
import Families from "@/components/store/Families";
import ArchitecturalGrid from "@/components/store/ArchitecturalGrid";
import FieldLoop from "@/components/store/FieldLoop";
import ArtisanDossier from "@/components/store/ArtisanDossier";
import BatchGuarantee from "@/components/store/BatchGuarantee";
import HousePromises from "@/components/store/HousePromises";

export default async function Home() {
  return (
    <main className="min-h-screen bg-white text-[#0f0f0f]">
      <Hero />
      <Marquee />
      <ObjectOfTheEdition />
      <Families />
      <ArchitecturalGrid />
      <FieldLoop />
      <ArtisanDossier />
      <BatchGuarantee />
      <HousePromises />
    </main>
  );
}
