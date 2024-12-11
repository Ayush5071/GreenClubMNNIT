import Scroller from "@/Components/scroller/scroller";
import About from "@/Components/sections/About";
import Contact from "@/Components/sections/Contact";
import FinalYear from "@/Components/sections/FinalYear";
import Footer from "@/Components/sections/Footer";
import HeroPage from "@/Components/sections/HeroPage";
import { SecondYear } from "@/Components/sections/SecondYear";
import { Testimonials } from "@/Components/sections/Testimonials";
import ThirdYear from "@/Components/sections/ThirdYear";
import { FloatingNav } from "@/Components/ui/FloatingNav";
import { navItems } from "@/lib/data/data";
export default function Home() {
    return (
    <div className="relative w-full h-full overflow-hidden">
      <FloatingNav navItems={navItems}/>
      <HeroPage/>
      <About/>
      <FinalYear/>
      <ThirdYear/>
      <SecondYear/>
      <Scroller/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  );
}
