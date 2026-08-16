import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { AdditionalExperience } from "@/components/AdditionalExperience";
import { About } from "@/components/About";
import { Interests } from "@/components/Interests";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <AdditionalExperience />
        <About />
        <Interests />
      </main>
      <SiteFooter />
    </>
  );
}
