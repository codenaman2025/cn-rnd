import React, { useEffect, useState } from "react";
import { IoCreate } from "react-icons/io5";
import JobCreationForm from "../components/form/JobCreationForm";
import { dummyJobs } from "../dummydata/JobsDummy";
import NewJobCard from "../components/cards/NewJobCard";


const HiringManager = () => {
   const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")))
  const [jobModal,setJobModal ] = useState(false);
  const [job,setJob] = useState(null)
  const openJobModal = ()=>{
    setJobModal(prev => !prev)
  }
  const createJob = (data) => {
    const updatedJobs = [...job, data]; 
    setJob(updatedJobs);               
    localStorage.setItem("jobs", JSON.stringify(updatedJobs)); 
    setJobModal(false);                  
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("jobs"));
    setJob(stored || dummyJobs); 
   
  }, []);


  return (
    <div>
      <div className="flex h-screen">
        <div className="h-1/2 !m-auto w-1/2 flex flex-col justify-evenly items-center bg-white shadow-md !mr-2">
         {
          jobModal ? <JobCreationForm close={()=>setJobModal(prev=>!prev)} submitJob={createJob}/> : <div className="">

<div className="">
            <div className="flex items-center gap-x-3 !mb-6"><h2 className="font-medium text-xl">Welcome : {currentUser.name}</h2><span className="inline-block">Role : Hiring Manager</span>
            </div>
            <h1 className=" inline-block font-bold text-2xl border-b-2 !pb-4">Create a Job Post: </h1>
          </div>
          <div className=" ">
               <button className=""><IoCreate className="cursor-pointer text-6xl" onClick={openJobModal}/></button>
          </div>

          </div>
         }
        </div>
        <div className="jobs w-full ">
        <div className="flex gap- flex-col h-screen">
  <div className="border flex-1 !p-2 overflow-scroll bg-white shadow-md flex-1">
    {job ? job.map((i,idx)=>{
      return  <NewJobCard {...i}/> 
    }): <h1 className="text-3xl text-center font-bold">No Jobs, Create One</h1>}
  </div>
  <div className="bg-white shadow-md flex-1">
    applicants
  </div>
  <div className="bg-white shadow-md flex-1">
    chatbot
  </div>
</div>

          </div>
      </div>
    </div>
  );
};

export default HiringManager;
