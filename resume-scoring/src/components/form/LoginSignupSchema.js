import { z } from "zod";

const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["job_seeker", "hiring_manager"], {
      required_error: "Please select a role",
    }),
    resume: z.instanceof(FileList).optional(),
  })

  .refine(
    (data) => {
      if (data.role === "job_seeker") {
        if (!data.resume || data.resume.length === 0) return false;

        return allowedFileTypes.includes(data.resume[0].type);
      }
      return true;
    },
    {
      message: "Job seekers must upload a PDF, JPG, or PNG resume",
      path: ["resume"],
    }
  );

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export { signupSchema, loginSchema };
