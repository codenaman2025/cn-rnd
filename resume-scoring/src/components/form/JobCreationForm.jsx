import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const jobSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  availability: z
    .number({ invalid_type_error: "Availability must be a number" })
    .min(1, "Availability must be at least 1 day"),
  position: z
    .number({ invalid_type_error: "Position must be a number" })
    .min(1, "At least 1 position is required"),
  jd: z.string().min(10, "Job description must be at least 10 characters"),
});

const JobCreationForm = ({ close }) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token"); // assuming token is stored
      const res = await fetch("http://localhost:8000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // if authentication required
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create job");
      }

      alert("Job created successfully!");
      reset();
      close();
    } catch (err) {
      alert(err.message);
    }
  };

  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2/3 !mx-auto !p-6 space-y-4 rounded-md shadow-md inset-1 bg-white"
      >
        <h2 className="text-xl font-bold">Create Job Post</h2>

        {/* Company Name */}
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            {...register("companyName")}
            className="border !p-2 w-full rounded"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className="block font-medium">Job Title</label>
          <input
            type="text"
            {...register("jobTitle")}
            className="border !p-2 w-full rounded"
          />
          {errors.jobTitle && (
            <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>
          )}
        </div>

        {/* Availability */}
        <div>
          <label className="block font-medium">Availability (in days)</label>
          <input
            type="number"
            {...register("availability", { valueAsNumber: true })}
            className="border !p-2 w-full rounded"
          />
          {errors.availability && (
            <p className="text-red-500 text-sm">{errors.availability.message}</p>
          )}
        </div>

        {/* Position */}
        <div>
          <label className="block font-medium">Positions (Openings)</label>
          <input
            type="number"
            {...register("position", { valueAsNumber: true })}
            className="border !p-2 w-full rounded"
          />
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position.message}</p>
          )}
        </div>

        {/* Job Description */}
        <div>
          <label className="block font-medium">Job Description</label>
          <textarea
            {...register("jd")}
            className="border !p-2 w-full rounded"
            rows={4}
          />
          {errors.jd && (
            <p className="text-red-500 text-sm">{errors.jd.message}</p>
          )}
        </div>

        <div className="flex gap-x-4">
          <button
            type="submit"
            className="bg-black text-white !px-4 !py-2 rounded"
          >
            Submit
          </button>

          <button
            type="button"
            className="bg-gray-500 text-white !px-4 !py-2 rounded"
            onClick={close}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobCreationForm;
