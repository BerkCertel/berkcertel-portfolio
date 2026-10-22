import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { Experience } from "@/components/sections/home/Experience";
import { Hero } from "@/components/sections/home/Hero";
import { TechStack } from "@/components/sections/home/TechStack";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <TechStack />
      {/* Design: no top padding here; the tech section above already provides the gap. */}
      <Experience className="pt-0" />
    </>
  );
}
