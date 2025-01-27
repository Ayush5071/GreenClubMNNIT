import React from "react";
import { secondYears } from "@/lib/team";
import Card from "@/Components/Card";

const SecondYear = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {secondYears.map((member, index) => (
        <Card key={index} member={member} />
      ))}
    </div>
  );
};

export default SecondYear;
