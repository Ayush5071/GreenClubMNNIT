import React from "react";
import { finalYears } from "@/lib/team";
import Card from "@/Components/Card";

const FinalYear = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {finalYears.map((member, index) => (
        <Card key={index} member={member} />
      ))}
    </div>
  );
};

export default FinalYear;
