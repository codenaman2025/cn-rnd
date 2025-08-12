import React from "react";
import { motion } from "framer-motion";

const JobCard = ({ companyname,position,availability,jd,jobtitle,openJobModal }) => {
  return (
    <main className="border-[0.5px] border-y-gray-400 !p-4 rounded-sm text-center  max-w-[300px] overflow-scroll">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex justify-around min-h-[400px] flex-col gap-y-6">
          <h2 className="font-bold text-2xl">{jobtitle}</h2>

          <div className="text-sm text-gray-600 flex flex-col justify-evenly">
            <p><strong>Company:</strong> {companyname}</p>
            <p><strong>Position:</strong> {position}</p>
            <p><strong>Availability:</strong> {availability}</p>
          
          </div>

          <button
            className="bg-black text-white rounded-sm text-sm !p-2 cursor-pointer"
            onClick={openJobModal}
          >
            View Job
          </button>
        </div>
      </motion.div>
    </main>
  );
};

export default JobCard;

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const JobCard = ({ title, description,openModal,getJobs}) => {
//   const {companyName,availability,jd,jobTitle,position} = getJobs
  
 

//   return (
//     <main className="border-[0.5px] border-y-gray-400 !p-4 rounded-sm text-center max-w-[300px]">
//       <motion.div
//         whileHover={{ y: -4 }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       >
//         <div className="flex flex-col gap-y-6">
//           <h2 className="font-bold text-2xl">{title}</h2>
//           <span className="text-sm text-muted-foreground">{description}</span>
//           <button
//             className="bg-black text-white rounded-sm text-sm !p-2 cursor-pointer"
//             onClick={openModal}
//           >
//             Apply Now
//           </button>
//         </div>
//       </motion.div>
//     </main>
//   );
// };

// export default JobCard;
