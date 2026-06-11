import { About } from "@/components/About";
import { AIProjects } from "@/components/AIProjects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/Portfolio";
import { Preloader } from "@/components/Preloader";

export default function HomePage({ searchParams }: { searchParams?: { preview?: string } }) {
  const showPreloader = searchParams?.preview !== "1";

  return (
    <>
      {showPreloader ? <Preloader /> : null}
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <AIProjects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
