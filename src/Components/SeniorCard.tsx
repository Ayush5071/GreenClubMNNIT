"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "./ui/SeniorCardComponent";

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
        <p className="font-bold text-xl">{name}</p>
        <p className="font-normal text-sm">{year}</p>
      </DirectionAwareHover>
    </div>
  );
}
