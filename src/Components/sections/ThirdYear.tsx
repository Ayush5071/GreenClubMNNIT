import React from "react";
import { thirdYears } from "@/lib/team";
import Card from "@/Components/Card";

const ThirdYear = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {thirdYears.map((member, index) => (
        <Card key={index} member={member} />
      ))}
    </div>
  );
};

export default ThirdYear;
