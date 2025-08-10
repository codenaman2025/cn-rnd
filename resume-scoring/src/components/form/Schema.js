import { z } from "zod";

const Schema = z.object({
  name: z
    .string()
    .min(2, "Enter Full name, full name must be at least 2 characters"),
  email: z.string().email("Invalid Email"),
  role: z.enum([
    "AI Engineer",
    "Data Scientist",
    "ML Engineer",
    "Full Stack Developer",
    "Front End Developer",
    "Backend Developer",
  ]),
  experience: z
    .number()
    .min(0, "Experience can'[t be negative")
    .max(50, "Invalid Experience"),
  keySkills: z
    .string()
    .min(1, "Please enter at least one skill")
    .transform((val) =>
      val
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    ),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Please upload a file")
    .refine((files) => {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      return allowedTypes.includes(files[0].type);
    }, "Only JPG, PNG, or PDF files are allowed"),
});

export { Schema };
