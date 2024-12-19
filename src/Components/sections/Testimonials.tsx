import { AnimatedTestimonials } from "../ui/Testimonias";

export function Testimonials() {
  const testimonials = [
    {
      quote: "I realized the need to protect the land, and there was only one way to protect the land - to plant trees. So, I started planting trees every day.",
      name: "Jadav Payeng",
      designation: "Forest Man of India",
      src: "/testimonials/jadav.jpg",
    },
    {
      quote: "It's the little things that citizens do. That's what will make the difference. My little thing is planting trees.",
      name: "Wangari Maathai",
      designation: "Environmental Activist, Nobel Peace Prize Winner",
      src: "/testimonials/wangari.jpg",
    },
    {
      quote: "The best way to know God is to love many things. And to love many things, we must preserve nature's wonders, one of which is trees.",
      name: "John Muir",
      designation: "Naturalist & Founder of the Sierra Club",
      src: "/testimonials/muir.jpg",
    },
    {
      quote: "It is not the style of clothes one wears, neither the kind of automobile one drives, nor the amount of money one has in the bank, that counts. These mean nothing. It is simply service that measures success.",
      name: "George Washington Carver",
      designation: "Agricultural Scientist & Environmental Pioneer",
      src: "/testimonials/george.jpg",
    },
    {
      quote: "When the last tree is cut down, the last fish caught, and the last river poisoned, you will realize that you cannot eat money.",
      name: "Sunderlal Bahuguna",
      designation: "Environmentalist, Leader of the Chipko Movement",
      src: "/testimonials/sundar.jpg",
    },

  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
