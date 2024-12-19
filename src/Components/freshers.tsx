"use client";
import React, { useState, useEffect } from "react";
import { HoverBorderGradient } from "./ui/hoverBorder";
import { freshers } from "@/lib/team";

type Student = {
  name: string;
  linkedin: string;
  team: string;
};

export function Freshers() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(freshers);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-12">
      {students.length > 0 ? (
        students.map((student, index) => (
          <div key={index} className="w-60">
            <HoverBorderGradient>
              <div className="flex flex-col w-52">
                <a
                  href={student.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-500"
                >
                  {student.name}
                </a>
               <span className="text-sm text-gray-500">{student.team}</span>
               </div>
             </HoverBorderGradient>
          </div>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
