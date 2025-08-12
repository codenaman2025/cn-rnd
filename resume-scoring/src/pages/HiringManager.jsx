import React, { useEffect, useState } from "react";
import { IoCreate } from "react-icons/io5";
import JobCreationForm from "../components/form/JobCreationForm";
import NewJobCard from "../components/cards/NewJobCard";
import ApplicantCard from "../components/cards/ApplicantCard";

const HiringManager = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [jobModal, setJobModal] = useState(false);
  const [job, setJob] = useState([]);
  const [applicant, setApplicants] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [errorJobs, setErrorJobs] = useState(null);
  const [errorApplicants, setErrorApplicants] = useState(null);

  const openJobModal = () => setJobModal((prev) => !prev);

  const createJob = async (data) => {
   
    try {
      const response = await fetch("http://localhost:8000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create job");
      const result = await response.json();

      const updatedJobs = [...job, result.job];
      setJob(updatedJobs);
      setJobModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    // Fetch jobs from backend
    const fetchJobs = async () => {
      setLoadingJobs(true);
      try {
        const res = await fetch("http://localhost:8000/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJob(data);
        setTotalJobs(data.length);
      } catch (error) {
        setErrorJobs(error.message);
      } finally {
        setLoadingJobs(false);
      }
      console.log(job);
    };

    
    const fetchApplicants = async () => {
      setLoadingApplicants(true);
      try {
        const res = await fetch("http://localhost:8000/applicants/all"); // You might want an endpoint to get all applicants or for jobs posted by current user
        if (!res.ok) throw new Error("Failed to fetch applicants");
        const data = await res.json();
        setApplicants(data);
        setTotalApplicants(data.length);
      } catch (error) {
        setErrorApplicants(error.message);
      } finally {
        setLoadingApplicants(false);
      }
    };

    fetchJobs();
    fetchApplicants();
  }, [jobModal]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/3 flex flex-col justify-center items-center bg-white shadow-md !p-4">
        {jobModal ? (
          <JobCreationForm
            close={() => setJobModal(false)}
            submitJob={createJob}
          />
        ) : (
          <div className="text-center">
            <div className="!mb-6">
              <h2 className="font-medium text-xl">
                Welcome: {currentUser.name}
              </h2>
              <span className="text-gray-600">Role: Hiring Manager</span>
            </div>
            <h1 className="font-bold text-2xl border-b-2 !pb-2 !mb-4">
              Create a Job Post:
            </h1>
            <IoCreate
              className="cursor-pointer text-6xl text-gray-800 hover:text-black transition"
              onClick={openJobModal}
            />
          </div>
        )}
      </div>

     
      <div className="w-2/3 flex flex-col">
        <h2 className="font-semibold border-b !pb-2 !mt-2 !mb-4">
          Created Jobs : {totalJobs}
        </h2>
        <div className="flex-1 bg-white shadow-md !p-4 overflow-auto">
          {loadingJobs && <p>Loading jobs...</p>}
          {errorJobs && <p className="text-red-500">{errorJobs}</p>}
          <div className="grid grid-cols-2 gap-4">
            {!loadingJobs &&
              !errorJobs &&
              (job.length > 0 ? (
                job.map((i, idx) => <NewJobCard key={idx} {...i} />)
              ) : (
                <p className="text-gray-500">No Jobs, Create One</p>
              ))}
          </div>
        </div>

        <div className="flex-1 bg-white shadow-md !p-4 overflow-auto">
          <h2 className="font-semibold border-b !pb-2 !mb-4">
            Applicants : {totalApplicants}
          </h2>
          {loadingApplicants && <p>Loading applicants...</p>}
          {errorApplicants && <p className="text-red-500">{errorApplicants}</p>}
          <div className="grid grid-cols-2 gap-4">
            {!loadingApplicants &&
              !errorApplicants &&
              (applicant.length > 0 ? (
                applicant.map((r, i) => <ApplicantCard key={i} {...r} />)
              ) : (
                <p className="text-gray-500">No applicants yet</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringManager;


// // import React, { useEffect, useState } from "react";
// // import { IoCreate } from "react-icons/io5";
// // import JobCreationForm from "../components/form/JobCreationForm";
// // import { dummyJobs } from "../dummydata/JobsDummy";
// // import NewJobCard from "../components/cards/NewJobCard";
// // import ApplicantCard from "../components/cards/ApplicantCard";

// // const HiringManager = () => {
// //   const [currentUser, setCurrentUser] = useState(
// //     JSON.parse(localStorage.getItem("currentUser"))
// //   );
// //   const [jobModal, setJobModal] = useState(false);
// //   const [job, setJob] = useState(null);
// //   const [applicant, setApplicants] = useState(null);
// //   const openJobModal = () => {
// //     setJobModal((prev) => !prev);
// //   };
// //   const createJob = (data) => {
// //     const updatedJobs = [...job, data];
// //     setJob(updatedJobs);
// //     localStorage.setItem("jobs", JSON.stringify(updatedJobs));
// //     setJobModal(false);
// //   };

// //   useEffect(() => {
// //     const stored = JSON.parse(localStorage.getItem("jobs"));
// //     setJob(stored || dummyJobs);
// //     const applications = JSON.parse(localStorage.getItem("applicants"));
// //     setApplicants(applications);
// //   }, []);

// //   return (
// //     <div>
// //       <div className="flex h-screen">
// //         <div className="h-1/2 !m-auto w-1/2 flex flex-col justify-evenly items-center bg-white shadow-md !mr-2">
// //           {jobModal ? (
// //             <JobCreationForm
// //               close={() => setJobModal((prev) => !prev)}
// //               submitJob={createJob}
// //             />
// //           ) : (
// //             <div className="">
// //               <div className="">
// //                 <div className="flex items-center gap-x-3 !mb-6">
// //                   <h2 className="font-medium text-xl">
// //                     Welcome : {currentUser.name}
// //                   </h2>
// //                   <span className="inline-block">Role : Hiring Manager</span>
// //                 </div>
// //                 <h1 className=" inline-block font-bold text-2xl border-b-2 !pb-4">
// //                   Create a Job Post:{" "}
// //                 </h1>
// //               </div>
// //               <div className=" ">
// //                 <button className="">
// //                   <IoCreate
// //                     className="cursor-pointer text-6xl"
// //                     onClick={openJobModal}
// //                   />
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //         <div className="jobs w-full ">
// //           <div className="flex gap- flex-col h-screen">
// //             <div className=" !p-2 overflow-scroll bg-white shadow-md flex-1">
// //               {job ? (
// //                 <div className="">
// //                   <h2 className="font-semibold !pb-2 !pt-2 border-b-1 inline-block !mb-4">Created Jobs</h2>
// //                   {job.map((i, idx) => {
// //                     return <NewJobCard {...i} />;
// //                   })}
// //                 </div>
// //               ) : (
// //                 <h1 className="text-3xl text-center font-bold">
// //                   No Jobs, Create One
// //                 </h1>
// //               )}
// //             </div>
// //             <div className="bg-white  shadow-md flex-1 overflow-y-scroll">
// //               <div className=" ">
// //                 {applicant?.map((r, i) => (
// //                   <ApplicantCard key={i} {...r} />
// //                 ))}
// //               </div>
// //             </div>
           
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HiringManager;


// import React, { useEffect, useState } from "react";
// import { IoCreate } from "react-icons/io5";
// import JobCreationForm from "../components/form/JobCreationForm";
// import { dummyJobs } from "../dummydata/JobsDummy";
// import NewJobCard from "../components/cards/NewJobCard";
// import ApplicantCard from "../components/cards/ApplicantCard";

// const HiringManager = () => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("currentUser"))
//   );
//   const [jobModal, setJobModal] = useState(false);
//   const [job, setJob] = useState([]);
//   const [applicant, setApplicants] = useState([]);
//   const [totalJobs,setTotalJobs] = useState(job.length || null)
//   const [totalApplicants, setTotalApplicants] = useState()

//   const openJobModal = () => setJobModal((prev) => !prev);

//   const createJob = (data) => {
//     const updatedJobs = [...job, data];
//     setJob(updatedJobs);
//     localStorage.setItem("jobs", JSON.stringify(updatedJobs));
//     setJobModal(false);
//   };

//   useEffect(() => {
//     const storedJobs = JSON.parse(localStorage.getItem("jobs")) || dummyJobs;
//     setJob(storedJobs);

//     const storedApplicants = JSON.parse(localStorage.getItem("applicants")) || [];
//     setApplicants(storedApplicants);
    
//   }, []);
//   useEffect(()=>{
//    setTotalJobs(job.length)
//    setTotalApplicants(applicant.length)

//   },[job])
//   return (
//     <div className="flex h-screen bg-gray-50">
      
//       <div className="w-1/3 flex flex-col justify-center items-center bg-white shadow-md !p-4">
//         {jobModal ? (
//           <JobCreationForm
//             close={() => setJobModal(false)}
//             submitJob={createJob}
//           />
//         ) : (
//           <div className="text-center">
//             <div className="!mb-6">
//               <h2 className="font-medium text-xl">
//                 Welcome: {currentUser.name}
//               </h2>
//               <span className="text-gray-600">Role: Hiring Manager</span>
//             </div>
//             <h1 className="font-bold text-2xl border-b-2 !pb-2 !mb-4">
//               Create a Job Post:
//             </h1>
//             <IoCreate
//               className="cursor-pointer text-6xl text-gray-800 hover:text-black transition"
//               onClick={openJobModal}
//             />
//           </div>
//         )}
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="w-2/3 flex flex-col">
        
//         <h2 className="font-semibold border-b !pb-2 !mt-2 !mb-4">Created Jobs : {totalJobs}</h2>
//         <div className="flex-1 bg-white shadow-md !p-4 overflow-auto">
         
//           <div className="grid grid-cols-2 gap-4">
//             {job.length > 0 ? (
//               job.map((i, idx) => <NewJobCard key={idx} {...i} />)
//             ) : (
//               <p className="text-gray-500">No Jobs, Create One</p>
//             )}
//           </div>
//         </div>

//         {/* APPLICANT LIST */}
//         <div className="flex-1 bg-white shadow-md !p-4 overflow-auto">
//           <h2 className="font-semibold border-b !pb-2 !mb-4">Applicants : {totalApplicants}</h2>
//           <div className="grid grid-cols-2 gap-4">
//             {applicant.length > 0 ? (
//               applicant.map((r, i) => <ApplicantCard key={i} {...r} />)
//             ) : (
//               <p className="text-gray-500">No applicants yet</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HiringManager;