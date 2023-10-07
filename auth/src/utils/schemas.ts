import * as z from "zod";

export const baseUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});
