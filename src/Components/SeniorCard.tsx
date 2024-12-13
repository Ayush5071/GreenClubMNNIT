"use client";

import { DirectionAwareHover } from "./ui/SeniorCardComponent";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";

export function SeniorCard({
  imageUrl,
  name,
  year,
  LinkedIn,
  Instagram,
}: {
  imageUrl: string;
  name: string;
  year: number;
  LinkedIn?: string;
  Instagram?: string;
}) {
  return (
    <div className="relative flex items-center justify-center">
      <DirectionAwareHover imageUrl={imageUrl}>
        <div className="flex gap-4 items-center">
          <div>
            <p className="font-bold text-lg">{name}</p>
            <p className="font-normal text-sm">{year}rd year</p>
          </div>
          <div className="flex text-2xl justify-center items-center gap-3">
            {Instagram && (
              <a href={Instagram} target="_blank" className="hover:text-pink-500">
                <PiInstagramLogoFill />
              </a>
            )}
            {LinkedIn && (
              <a href={LinkedIn} target="_blank" className="hover:text-blue-500">
                <FaLinkedin />
              </a>
            )}
          </div>
        </div>
      </DirectionAwareHover>
    </div>
  );
}
