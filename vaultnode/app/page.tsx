import { Hero } from "./components/sections/Hero";
import { Mockup } from "./components/sections/Mockup";
import { BentoGrid } from "./components/sections/BentoGrid";
import { SystemLogs } from "./components/sections/SystemLogs";
import { Pricing } from "./components/sections/Pricing";
import { Footer } from "./components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero />
      <Mockup />
      <BentoGrid />
      <SystemLogs />
      <Pricing />
      <Footer />
    </main>
  );
}