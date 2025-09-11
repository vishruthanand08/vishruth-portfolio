import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Interests } from "@/components/Interests";
import { Experience } from "@/components/Experience";
import RollingGallery from "@/components/RollingGallery";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <RollingGallery />
      <Interests />
    </main>
  );
}
