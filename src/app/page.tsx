import Scroller from "@/Components/scroller/scroller";
import About from "@/Components/sections/About";
import Contact from "@/Components/sections/contact";
import FinalYear from "@/Components/sections/FinalYear";
import Footer from "@/Components/sections/footer";
import HeroPage from "@/Components/sections/HeroPage";
import Navbar from "@/Components/sections/Navbar";
import ThirdYear from "@/Components/sections/thirdYear";

export default function Home() {
    return (
    <div className="relative w-full h-full">
      <Navbar/>
      <HeroPage/>
      <About/>
      <FinalYear/>
      <ThirdYear/>
      <Scroller/>
      <Contact/>
      <Footer/>
    </div>
  );
}
