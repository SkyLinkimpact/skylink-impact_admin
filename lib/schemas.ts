import { z } from "zod";

/**
 * Login form schema for validation
 *
 * @remarks
 * These schema are used by React Hook Form to validate the inputs
 * of the login form.
 */
export const loginFormSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

/**
 * Forgot password form schema for validation
 *
 * @remarks
 * These schema are used by React Hook Form to validate the inputs
 * of the forgot password form.
 */
export const forgotPasswordFormSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

/**
 * Reset password form schema for validation
 *
 * @remarks
 * These schema are used by React Hook Form to validate the inputs
 * of the reset password form.
 */
export const resetPasswordFormSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    password: z.string().min(1, "Password is required"),
    password_confirmation: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

/**
 * Blog form schema for validation
 *
 * @remarks
 * These schema are used by React Hook Form to validate the inputs
 * of the blog form.
 */
export const createBlogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  isDraft: z.boolean().nullish().default(false),
  media_id: z.string().min(1, "Thumbnail is required"),
});

/**
 * Update blog form schema for validation
 *
 * @remarks
 * These schema are used by React Hook Form to validate the inputs
 * of the blog form.
 */
export const updateBlogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  media_id: z.string().min(1, "Thumbnail is required"),
  isDraft: z.boolean().nullish().default(false),
});

  /**
   * Creates a schema for validating the create event form.
   *
   * @remarks
   * These schema are used by React Hook Form to validate the inputs
   * of the create event form.
   */
  export const createEventFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    url: z.string().min(1, "Event URL is required").url("Invalid URL"),
    media_id: z.string().min(1, "Thumbnail is required"),
    event_at: z.string().min(1, "Date/Time is required"),
  });
