import {
  About,
  Achievements,
  Contact,
  Experience,
  Footer,
  Hero,
  Skills,
  Stats,
  Work,
} from "@/components/sections";
import { getGithubStats } from "@/lib/github";

export const revalidate = 3600;

export default async function Home() {
  const stats = await getGithubStats();

  return (
    <>
      <Hero />
      <Stats stats={stats} />
      <About />
      <Work />
      <Experience />
      <Achievements />
      <Skills stats={stats} />
      <Contact />
      <Footer />
    </>
  );
}
