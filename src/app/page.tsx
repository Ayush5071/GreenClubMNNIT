import Scroller from "@/Components/scroller/scroller";
import About from "@/Components/sections/About";
import Contact from "@/Components/sections/Contact";
import Context from "@/Components/sections/Context";
import Footer from "@/Components/sections/Footer";
import HeroPage from "@/Components/sections/HeroPage";
import { Mission } from "@/Components/sections/Mission";
import { Testimonials } from "@/Components/sections/Testimonials";
import { FloatingNav } from "@/Components/ui/FloatingNav";
import { navItems } from "@/lib/data/data";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      {/* Check the logo */}
      <div className="absolute z-40 translate-y-2 sm:translate-y-0 w-[20vw] sm:w-[20vw] md:w-[14vw] lg:w-[8vw] h-auto max-w-full">
  <Image
    src="/Images/logo.webp"
    alt="Logo"
    width={1000}  
    height={1000} 
    className="w-full h-auto"   
  />
</div>



      <FloatingNav navItems={navItems} />
      <HeroPage />
      <Context />
      <About />
      <Mission />
      <Scroller />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

