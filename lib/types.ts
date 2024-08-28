import { z } from "zod";
import {
  forgotPasswordFormSchema,
  loginFormSchema,
  resetPasswordFormSchema,
} from "./schemas";

/**
 * A user login request.
 */
export type UserLoginRequest = z.infer<typeof loginFormSchema>;

/**
 * A user.
 *
 * @remarks
 * Represents a user in the system.
 */
export type User = {
  /**
   * The user's ID.
   */
  id: string;
  /**
   * The user's name.
   */
  name: string;
  /**
   * The user's email address.
   */
  email: string;
  /**
   * The user's creation date.
   */
  createdAt: Date;
};

/**
 * An error response from the server.
 *
 * @remarks
 * Represents an error response from the server. The response
 * contains a `data` object which contains a `message` and
 * optionally an `errors` object which contains error messages
 * for each field.
 */
export type ServerErrorResponse = {
  response: {
    data: {
      message: string;
      errors?: Record<string, string[]>;
    };
  };
};

/**
 * A request to reset a user's password.
 *
 */
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordFormSchema>;

/**
 * A request to reset a user's password.
 *
 */
export type ResetPasswordRequest = z.infer<typeof resetPasswordFormSchema>;
