import Scroller from "@/Components/scroller/scroller";
import About from "@/Components/sections/About";
import Contact from "@/Components/sections/Contact";
import Context from "@/Components/sections/Context";
import Footer from "@/Components/sections/Footer";
import HeroPage from "@/Components/sections/HeroPage";
import { Testimonials } from "@/Components/sections/Testimonials";
import { FloatingNav } from "@/Components/ui/FloatingNav";
import { navItems } from "@/lib/data/data";
export default function Home() {
    return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      <FloatingNav navItems={navItems}/>
      <HeroPage/>
      <Context/>
      <About/>
      <Scroller/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  );
}
