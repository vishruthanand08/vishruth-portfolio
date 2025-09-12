import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Interests } from "@/components/Interests";
import { Experience } from "@/components/Experience";
import ProjectGrid from "../components/ProjectGrid";
import AdditionalExperience from "@/components/AdditionalExperience";


export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <ProjectGrid />
      <AdditionalExperience />
      <Interests />
    </main>
  );
}
