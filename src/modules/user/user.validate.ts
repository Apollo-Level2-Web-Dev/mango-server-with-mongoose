import z from "zod";
import { UserRole } from "./user.constrain";

const userCreateZodSchema = z.object({
  name: z
    .string()
    .min(3, "Name Must be in 3 characters")
    .max(255, "Name can't be more that 255 characters"),
  email: z.email({ error: "Invalid email" }),
  // .string()
  // .regex(
  //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  //   "Please enter a valid email"
  // ),
  phone: z.string(),
  password: z.string(),
  role: z.enum(UserRole),
});

const userLoginZodSchema = z.object({
  email: z.email({ error: "Invalid email" }),

  password: z.string(),
});

export const userZodSchema = {
  userCreateZodSchema,
  userLoginZodSchema,
};
