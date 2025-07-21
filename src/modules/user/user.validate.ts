import z from 'zod';
import { UserRole } from './user.constrain';

const userCreateZodSchema = z.object({
  name: z
    .string()
    .min(3, 'Name Must be in 3 characters')
    .max(255, "Name can't be more that 255 characters"),
  email: z.email({ error: 'Invalid email' }),
  phone: z.string(),
  password: z.string(),
  role: z.enum(UserRole),
});

const userLoginZodSchema = z.object({
  email: z.email({ error: 'Invalid email' }),

  password: z.string(),
});

export const userZodSchema = {
  userCreateZodSchema,
  userLoginZodSchema,
};
