"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "./ui/SeniorCardComponent";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";


export function SeniorCard({
    imageUrl,
    name,
    year,
    LinkedIn,
    Instagram
}:{
    imageUrl:string,
    name:string,
    year:number,
    LinkedIn?:string,
    Instagram?:string
    
}) {
  return (
    <div className="relative  flex items-center justify-center">
      <DirectionAwareHover imageUrl={imageUrl}>
        <div className="flex gap-5">
          <div className="">
            <p className="font-bold text-2xl">{name}</p>
          </div>
          <div className="flex text-4xl justify-center items-center gap-2">
          <a href={`https://www.instagram.com/${Instagram}`} target="_blank">
            <PiInstagramLogoFill/>
          </a>
          <a href={LinkedIn} target="_blank">
            <FaLinkedin/>
          </a>
          </div>
        </div>


      </DirectionAwareHover>
    </div>
  );
}
