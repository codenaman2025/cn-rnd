import React, { useEffect, useState, useContext } from "react";
import JobCard from "../components/cards/JobCard";
import { motion } from "framer-motion";
import { AuthContext } from "../auth/AuthContext";
import { JobContext } from "../auth/JobsContext";

const JobSeeker = () => {
  const [openModal, setModal] = useState(null);
  const { user } = useContext(AuthContext);
  const { getJobs,fetchJobs } = useContext(JobContext);
   useEffect(()=>{
    fetchJobs()
   },[])
  const createApplication = async () => {
    try {
      const application = {
        name: user.name,
        email: user.email,
        appliedcompany: openModal.companyname,
        jobtitle: openModal.jobtitle,
        resume: user.resume,
      };

      const res = await fetch("http://127.0.0.1:8000/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });

      if (!res.ok) throw new Error("Failed to apply for job");
      alert("Job has been applied");
      setModal(null);
    } catch (err) {
      console.error(err);
      alert("There was some problem while applying, try again");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-2/3 !p-4">
        <div className="bg-white rounded-xl shadow-lg !p-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold border-b !pb-3 text-black">
              Profile Info
            </h1>
            <span className="font-semibold !pb-1 text-black">
              Role: Job Seeker
            </span>
          </div>

          <div className="!mt-6 flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Name: <span className="font-normal">{user?.name}</span>
              </h2>
            </div>

            <div>
              <span className="text-gray-700 font-medium">Email:</span>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <div>
              <span className="text-gray-700 font-medium">Resume:</span>
              <button className="!ml-3 !px-4 !py-2 bg-black text-white rounded-lg hover:bg-gray-600">
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full !p-4">
        <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-300">
          <h1 className="text-xl font-semibold text-gray-800">
            Job Applications
          </h1>
          {openModal ? (
            <div className="">
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white rounded-lg shadow-lg !p-6 max-w-lg w-full">
                  <h2 className="text-2xl font-bold !mb-4">
                    Company Name: {openModal.companyname}
                  </h2>
                  <p className="text-gray-700 !mb-6">
                    Job Title: {openModal.jobtitle}
                  </p>
                  <p className="text-gray-700 !mb-6">
                    Job Description: {openModal.jd}
                  </p>
                  <p className="text-gray-700 !mb-6">
                    Job Validity(days): {openModal.availability}
                  </p>
                  <p className="text-gray-700 !mb-6">
                    No. openings: {openModal.position}
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      className="!px-4 !py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => setModal(null)}
                    >
                      Close
                    </button>
                    <button
                      className="!px-4 !py-2 bg-black text-white rounded hover:bg-gray-700"
                      onClick={createApplication}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[600px] grid grid-cols-2 !mt-2 gap-y-2 gap-x-2 !overflow-y-scroll">
              {getJobs.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <JobCard {...r} openJobModal={() => setModal(r)} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeeker;


// import React, { useContext, useEffect, useState } from "react";
// import JobCard from "../components/cards/JobCard";
// import { motion } from "framer-motion";
// import { AuthContext } from "../auth/AuthContext";
// import { JobContext } from "../auth/JobsContext";

// const JobSeeker = () => {
//   const [openModal, setModal] = useState(null);
//   // const { user } = useContext(AuthContext);
//   const [user,setuser] = useState(JSON.parse(localStorage.getItem("currentUser")) || [])

//   const [getJobs, setJobs] = useState(JSON.parse(localStorage.getItem("jobs")));
//   const [applicant,setApplicant] = useState([])
//   useEffect(() => {
//     console.log("from use effect", openModal);
//   }, [openModal]);
//   const createApplication = () => {
//     setApplicant(prev => {
//       const updated = [...prev, {
//         name: user.name,
//         email: user.email,
//         appliedCompany: openModal.companyName,
//         jobTitle: openModal.jobTitle,
//         resume: user.resume
//       }];
//       localStorage.setItem("applicants", JSON.stringify(updated));
//      if(updated.length > prev.length){
//       window.alert("Job has been applied")
//      }else{
//       window.alert("There was some problem while applying, try again")
//      }
//       return updated;
//     });
    
//   };

//   return (
//     <div className="flex min-h-screen  bg-gray-100">
//       <div className="w-2/3 !p-4">
//         <div className="bg-white rounded-xl shadow-lg !p-6 ">
//           <div className="flex justify-between">
//             <h1 className="text-2xl font-semibold border-b !pb-3 text-black">
//               Profile Info
//             </h1>
//             <span className="font-semibold !pb-1 text-black">
//               Role: Job Seeker
//             </span>
//           </div>

//           <div className="!mt-6 flex flex-col gap-5">
//             <div>
//               <h2 className="text-xl font-bold text-gray-800">
//                 Name: <span className="font-normal">{user?.name}</span>
//               </h2>
//             </div>

//             <div>
//               <span className="text-gray-700 font-medium">Email:</span>
//               <p className="text-gray-600">{user?.email}</p>
//             </div>

//             <div>
//               <span className="text-gray-700 font-medium">Resume:</span>
//               <button className="!ml-3 !px-4 !py-2 bg-black text-white rounded-lg hover:bg-gray-600 transition-all cursor-pointer">
//                 View
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full !p-4">
//         <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-300 ">
//           <h1 className="text-xl font-semibold text-gray-800">
//             Job Applications
//           </h1>
//           {openModal ? (
//             <div className="">
//               <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//                 <div className="bg-white rounded-lg shadow-lg !p-6 max-w-lg w-full">
//                   <h2 className="text-2xl font-bold !mb-4">
//                     Company Name: {openModal.companyName}
//                   </h2>
//                   <p className="text-gray-700 !mb-6">
//                     Job Title: {openModal.jobTitle}
//                   </p>
//                   <p className="text-gray-700 !mb-6">
//                     Job Description: {openModal.jd}
//                   </p>
//                   <p className="text-gray-700 !mb-6">
//                     Job Validity(days): {openModal.availability}
//                   </p>
//                   <p className="text-gray-700 !mb-6">
//                     No. openings: {openModal.position}
//                   </p>
//                   <div className="flex justify-end gap-3">
//                     <button
//                       className="!px-4 !py-2 bg-gray-300 rounded hover:bg-gray-400"
//                       onClick={() => setModal(null)}
//                     >
//                       Close
//                     </button>
//                     <button
//                       className="!px-4 !py-2 bg-black text-white rounded hover:bg-gray-700"
//                       onClick={createApplication}
//                     >
//                       Apply
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="h-[600px] grid grid-cols-2 !mt-2 gap-y-2 gap-x-2  !overflow-y-scroll">
//               {getJobs.map((r, i) => (
//                 <motion.div
//                   key={r.title}
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 * i }}
//                 >
//                   <JobCard {...r} openJobModal={() => setModal(r)} />
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobSeeker;

// // dummytestData
// // const roles = [
// //   {
// //     title: "AI Engineer",
// //     desc: "Build and optimize LLM/RAG systems and AI features.",
// //   },
// //   {
// //     title: "Data Scientist",
// //     desc: "Deliver insights via experiments, models, and analytics.",
// //   },
// //   {
// //     title: "ML Engineer",
// //     desc: "Ship models to production with robust MLOps.",
// //   },
// //   {
// //     title: "Full Stack Engineer",
// //     desc: "Create delightful end-to-end product experiences.",
// //   },
// //   {
// //     title: "Product Manager",
// //     desc: "Define strategy and drive AI-first roadmaps.",
// //   },
// // ];
