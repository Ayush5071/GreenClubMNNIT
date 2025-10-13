import Scroller from "@/Components/scroller/scroller";
import Contact from "@/Components/sections/Contact";
import Context from "@/Components/sections/Context";
import Footer from "@/Components/sections/Footer";
import HeroPage from "@/Components/sections/HeroPage";
import { Mission } from "@/Components/sections/Mission";
import { Testimonials } from "@/Components/sections/Testimonials";
import UpcomingProjects from "@/Components/sections/UpcomingProjects";
import { FloatingNav } from "@/Components/ui/FloatingNav";
import { navItems } from "@/lib/data/data";


export default function Home() {  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950 notallow">
      <FloatingNav navItems={navItems} />
      <HeroPage />
      <Context />
      <Mission />
      <Scroller />
      <UpcomingProjects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

