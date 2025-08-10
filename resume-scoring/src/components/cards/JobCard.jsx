import React from "react";
import {motion} from 'framer-motion'

const JobCard = ({ title, description }) => {
  return (
    <main className="border-[0.5px] border-y-gray-400 !p-4 rounded-sm text-center max-w-[300px]">
       <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
       <div className="flex flex-col gap-y-6">
        <h2 className="font-bold text-2xl">{title}</h2>
        <span className="text-sm text-muted-foreground">{description}</span>
        <button className="bg-black text-white rounded-sm text-sm !p-2 cursor-pointer">Apply Now</button>
      </div>
       </motion.div>
    
    </main>
  );
};

export default JobCard;
