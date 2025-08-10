import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "./Schema";

const JobApplicationForm =()=> {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", {
      ...data,
      keySkills: data.keySkills, 
      file: data.file[0], 
    });
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md !px-3 !py-2 focus:outline-none focus:ring focus:border-blue-500 !mt-1";
  const errorClass = "text-red-500 text-sm !mt-1";

  return (
    <div className="max-w-md !mx-auto !mt-10 bg-white !p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold !mb-4">Job Application Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       
        <div>
          <input {...register("name")} placeholder="Full Name" className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        
        <div>
          <input {...register("email")} placeholder="Email" className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        
        <div>
          <select {...register("role")} className={inputClass}>
            <option value="">-- Select Role --</option>
            <option value="AI Engineer">AI Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="ML Engineer">ML Engineer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Front End Developer">Front End Developer</option>
            <option value="Backend Developer">Backend Developer</option>
          </select>
          {errors.role && <p className={errorClass}>{errors.role.message}</p>}
        </div>

       
        <div>
          <input
            type="number"
            {...register("experience", { valueAsNumber: true })}
            placeholder="Experience (years)"
            className={inputClass}
          />
          {errors.experience && <p className={errorClass}>{errors.experience.message}</p>}
        </div>

        
        <div>
          <input
            {...register("keySkills")}
            placeholder="Key skills (comma separated)"
            className={inputClass}
          />
          {errors.keySkills && <p className={errorClass}>{errors.keySkills.message}</p>}
        </div>

      
        <div>
          <input type="file" {...register("file")} className={inputClass} />
          {errors.file && <p className={errorClass}>{errors.file.message}</p>}
        </div>

    
        <button
          type="submit"
          className="w-full bg-black text-white !py-2 rounded-md !mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default JobApplicationForm;