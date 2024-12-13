"use client";
import React from "react";
import { LayoutGrid } from "../ui/About";

function About() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

export default About;

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Plantation Drives
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Green Club organizes regular plantation drives to enhance greenery within
        the MNNIT campus, creating a more vibrant and healthy environment for everyone.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Sustainable Waste Management
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Promoting eco-friendly practices by installing and maintaining dustbins
        across the campus, the Green Club ensures proper waste segregation and recycling initiatives.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Eco-Friendly Activities
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        From spreading awareness about sustainability to encouraging the use of reusable products,
        Green Club fosters a culture of environmental responsibility among students and staff.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Enhancing Campus Sustainability
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Initiatives like reducing plastic use, water conservation, and
        maintaining eco-friendly zones make Green Club a driving force for sustainability at MNNIT.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: "/Images/img5.webp",
    imageClass: "translate-y-[0]",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: "/Images/img8.webp",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: "/Images/img3.webp",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail: "/Images/img9.webp",
    imageClass: "translate-y-[0%]", // Adjust upward
  },
];

