// src/schema/hireTalentSchema.js
import { z } from "zod";

export const contactusSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  message: z.string().min(1, "Job description is required"),
});  