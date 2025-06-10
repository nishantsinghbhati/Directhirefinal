// src/schema/hireTalentSchema.js
import { z } from "zod";

export const jobSeekerSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  city: z.string().min(1, "City is required"),
  currentctc: z.string().min(1, "Current CTC is required"),
  expectedctc: z.string().min(1, "Expected CTC is required"),
  gender: z.enum(["male", "female", "others"], {
    errorMap: () => ({ message: "Select the Gender" }),
  }),
  company: z.string().optional(),
  experience: z.string().min(1, "Enter the Experience"),
  education: z.string().min(1, "Enter the education"),
  resume: z.any().optional(), // Add this line to include the resume field
});