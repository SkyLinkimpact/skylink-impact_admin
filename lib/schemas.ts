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
