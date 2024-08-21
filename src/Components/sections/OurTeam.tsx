import React from 'react'
import { SeniorCard } from '../SeniorCard';
const OurTeam = () => {
    let urlImage = "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0";
  return (
    <div className="flex flex-col gap-6">
        <div className="h-96 bg-slate-300"></div>
        <div className="flex flex-wrap justify-center gap-10">
        <SeniorCard name="ayush" year={3} imageUrl={urlImage} />
        <SeniorCard name="ayush" year={3} imageUrl={urlImage} />
        <SeniorCard name="ayush" year={3} imageUrl={urlImage} />
        <SeniorCard name="ayush" year={3} imageUrl={urlImage} />
        <SeniorCard name="ayush" year={3} imageUrl={urlImage} />
        <SeniorCard name="ayush" year={3} imageUrl={urlImage} />
        <SeniorCard name="ayush" year={3} imageUrl={urlImage} />
        </div>
    </div>    
  )
}
export default OurTeam;