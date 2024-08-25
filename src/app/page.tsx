import Scroller from "@/Components/scroller/scroller";
import About from "@/Components/sections/About";
import Contact from "@/Components/sections/Contact";
import FinalYear from "@/Components/sections/FinalYear";
import Footer from "@/Components/sections/Footer";
import HeroPage from "@/Components/sections/HeroPage";
import Navbar from "@/Components/sections/Navbar";
import { SecondYear } from "@/Components/sections/SecondYear";
import ThirdYear from "@/Components/sections/ThirdYear";
export default function Home() {
    return (
    <div className="relative w-full h-full">
      <Navbar/>
      <HeroPage/>
      <About/>
      <FinalYear/>
      <ThirdYear/>
      <SecondYear/>
      <Scroller/>
      <Contact/>
      <Footer/>
    </div>
  );
}
