"use client";

import { ParallaxScroll } from "@/Components/ui/Gallery";
import Link from "next/link";

function Gallery() {
  // Allowed image indices
  const allowedIndices = [
    1, 2, 3, 4,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26,
    32, 40, 45, 47, 49,
  ];

  // Dynamically generating the image URLs for the specified indices
  const images = allowedIndices.map((index) => `/gallery/img${index}.webp`);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Back button */}
      <div className="self-start">
        <Link href="/" className="flex items-center text-blue-500 hover:text-blue-700 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Gallery heading */}
      <h1 className="text-4xl font-bold text-center text-gray-800 my-4">
        Welcome to the Gallery
      </h1>
      <p className="text-gray-500 text-center">
        Explore the beautiful collection of curated images.
      </p>

      {/* ParallaxScroll component */}
      <ParallaxScroll images={images} />
    </div>
  );
}

export default Gallery;
