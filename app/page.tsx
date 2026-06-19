import HeroSection from "@/components/home/HeroSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import EmergencyBanner from "@/components/home/EmergencyBanner";
import VideoSection from "@/components/home/VideoSection";
import TeamPreview from "@/components/home/TeamPreview";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <EmergencyBanner />
      <VideoSection />
      <TeamPreview />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </>
  );
}
