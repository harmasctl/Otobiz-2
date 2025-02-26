import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
});

export const profileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .optional(),
  social_links: z
    .object({
      facebook: z.string().url("Invalid URL").optional(),
      twitter: z.string().url("Invalid URL").optional(),
      instagram: z.string().url("Invalid URL").optional(),
      linkedin: z.string().url("Invalid URL").optional(),
    })
    .optional(),
});
