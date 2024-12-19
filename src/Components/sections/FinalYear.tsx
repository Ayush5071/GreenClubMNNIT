"use client"
import React, { useState, useEffect } from "react";
import { SeniorCard } from "../SeniorCard";
import { finalYears } from "@/lib/team"; 

const SecondYear = () => {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    setStudents(finalYears); 
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap justify-center gap-10">
        {students.length > 0 ? (
          students.map((student, index) => (
            <SeniorCard
              key={index}
              name={student.name}
              year={4}
              imageUrl={student.drive} 
              LinkedIn={student.linkedin} 
              Instagram={student.instagram} 
            />
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default SecondYear;
