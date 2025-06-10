// src/schema/hireTalentSchema.js
import { z } from "zod";

export const hireTalentSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  contact: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  location: z.string().min(1, "Location is required"),
  mode: z.enum(["remote", "onsite", "hybrid"], {
    errorMap: () => ({ message: "Select a work mode" }),
  }),
  salary: z.string().optional(),
  experience: z.string().optional(),
});
