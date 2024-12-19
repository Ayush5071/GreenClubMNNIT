"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { TypewriterEffectSmooth } from "../ui/Footer";

import {toast} from "react-hot-toast"

function Footer() {
  const words = [
    { text: "Plant Trees", className: "text-green-500" },
    { text: "Save Water", className: "text-blue-400" },
    { text: "Support Wildlife", className: "text-yellow-400" },
    { text: "Go Green", className: "text-green-600" },
  ];

  const handleclick = () => {
    toast.success("No Openings for now");
  }

  return (
    <footer className="flex flex-col items-center justify-center py-10 bg-zinc-950 text-white space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm sm:text-lg font-semibold text-white">
          Join us in making the planet greener!
        </p>
        <TypewriterEffectSmooth words={words} />
      </div>
      <div className="space-y-4 text-center">
        <p className="text-sm sm:text-base text-gray-400">
          We promote planting trees, keeping water pots for animals, and other
          eco-friendly initiatives to build a sustainable future.
        </p>
        <p className="text-xs sm:text-sm text-green-400 font-bold">
          Small steps for nature can lead to giant leaps for the Earth.
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button onClick={handleclick} className="w-40 h-10 rounded-xl bg-green-600 text-white text-sm shadow-lg hover:bg-green-700">
          Join Us
        </button>
      </div>
      <div className="w-full text-center space-y-2">
        <p className="text-sm font-medium text-gray-400">Follow Us</p>
        <div className="flex justify-center space-x-4 text-lg">
          <a
            href="https://www.facebook.com/MNNITGreenClub/"
            aria-label="Facebook"
            className="text-blue-500 hover:brightness-125"
          >
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a
            href="https://www.instagram.com/greenclub_mnnit/"
            aria-label="Instagram"
            className="text-pink-500 hover:brightness-125"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-blue-400 hover:brightness-125"
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a
            href="https://www.linkedin.com/company/mnnit-green-club/posts/?feedView=all"
            aria-label="LinkedIn"
            className="text-blue-600 hover:brightness-125"
          >
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
        </div>
      </div>
      <div className="w-full text-center text-sm space-y-2 text-gray-500">
  <p>
    Address: Motilal Nehru National Institute of Technology Allahabad,
    Prayagraj, Uttar Pradesh, India – 211004
  </p>
  <p>
    &copy; {new Date().getFullYear()}{" "}
    <a href="https://ayush-delta.vercel.app" className="text-blue-500 hover:underline">
      Ayush Tiwari
    </a>{" "}
    x Green Club. All Rights Reserved.
  </p>
</div>

    </footer>
  );
}

export default Footer;
