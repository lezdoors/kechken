import type { Metadata } from "next";
import InvisibleHeader from "@/components/store/luxury/InvisibleHeader";
import CinematicHero from "@/components/store/luxury/CinematicHero";
import MuseumGallery from "@/components/store/luxury/MuseumGallery";
import ArtisanDossier from "@/components/store/luxury/ArtisanDossier";
import ScarcityManifesto from "@/components/store/luxury/ScarcityManifesto";
import AtelierFooter from "@/components/store/luxury/AtelierFooter";

export const metadata: Metadata = {
  title: "Maison Tanneurs — Parisian Elegance, Medina Craftsmanship",
  description:
    "Limited-edition handcrafted Moroccan leather goods for the European luxury market. Seven master tanners. Fourteen-day cycle. Numbered, signed, never restocked.",
  robots: { index: false, follow: false }, // preview only
};

export default function LuxuryLanding() {
  return (
    <main className="min-h-screen bg-white text-black">
      <InvisibleHeader />
      <CinematicHero />
      <MuseumGallery />
      <ArtisanDossier />
      <ScarcityManifesto />
      <AtelierFooter />
    </main>
  );
}
