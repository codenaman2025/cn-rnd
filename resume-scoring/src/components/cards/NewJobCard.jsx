import React from "react";
import { json } from "zod";

const NewJobCard = ({ companyName, jobTitle, availability, position, jd }) => {
    const {role} = JSON.parse(localStorage.getItem("currentUser")) || {}
    console.log(role)
  return (
    <div className="border rounded-lg !mt-2 !p-4 shadow-md bg-white hover:shadow-lg transition">
      <h2 className="text-lg font-bold text-gray-800">{jobTitle}</h2>
      <p className="text-sm text-gray-500">{companyName}</p>

      <div className="!mt-3 text-sm text-gray-700">
        <p><span className="font-semibold">Availability:</span> {availability} days</p>
        <p><span className="font-semibold">Positions:</span> {position}</p>
      </div>

      <p className="!mt-3 text-gray-600 text-sm line-clamp-3">{jd}</p>
     {
        role === 'job_seeker' ?  <button className="!mt-4 !px-4 !py-2 bg-black text-white rounded hover:bg-gray-800">
        Apply Now
      </button> : ""
     }
    
    </div>
  );
};

export default NewJobCard;
