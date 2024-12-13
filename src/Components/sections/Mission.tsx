"use client";
import React from "react";
import Image from "next/image";
import { StickyScroll } from "../ui/StickyScroll";

const content = [
  {
    title: "Promoting Sustainability",
    description:
      "Our Green Club champions eco-friendly practices, inspiring individuals to make sustainable choices. Join us in creating a greener future by advocating for renewable energy, reducing waste, and protecting our planet.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/Images/img8.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Promoting Sustainability"
        />
      </div>
    ),
  },
  {
    title: "Tree Plantation Drives",
    description:
      "Our Green Club actively organizes tree plantation drives to combat deforestation and improve air quality. Together, we contribute to restoring green cover and fostering biodiversity in our local communities.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/Images/img1.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Tree Plantation Drives"
        />
      </div>
    ),
  },
  {
    title: "Spreading Environmental Awareness",
    description:
      "Through workshops, campaigns, and events, we aim to educate and inspire people about pressing environmental issues. Let's work together to make informed choices and prioritize our planet's well-being.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/Images/img3.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Spreading Environmental Awareness"
        />
      </div>
    ),
  },
  {
    title: "Waste Management Programs",
    description:
      "Our club encourages responsible waste management through recycling initiatives and clean-up drives. Every small effort leads to a bigger impact—join us in keeping our surroundings clean and green.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/Images/img4.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Waste Management Programs"
        />
      </div>
    ),
  },
];

export function Mission() {
  return (
    <div className="py-10">
      <StickyScroll content={content} />
    </div>
  );
}
