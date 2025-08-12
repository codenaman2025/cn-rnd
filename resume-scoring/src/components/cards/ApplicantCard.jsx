import React from "react";

const ApplicantCard = ({ name, email, appliedcompany, jobtitle, resume }) => {
  return (
    <div className="border rounded-lg !mt-2 !p-4 shadow-md bg-white hover:shadow-lg transition ">
      
      <h2 className="text-lg font-bold text-gray-800">Name: {name}</h2>
      <p className="text-sm text-gray-500">Email: {email}</p>

    
      <div className="!mt-3 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Company:</span> {appliedcompany}
        </p>
        <p>
          <span className="font-semibold">Job Title:</span> {jobtitle}
        </p>
      </div>

     
      {resume && (
        <a
          href={resume}
          target="_blank"
          rel="noopener noreferrer"
          className="!mt-4 inline-block !px-4 !py-2 bg-black text-white rounded hover:bg-gray-800 text-sm"
        >
          View Resume
        </a>
      )}
    </div>
  );
};

export default ApplicantCard;
