import { z } from "zod";
import { loginFormSchema } from "./schemas";

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

export type ServerErrorResponse = {
  response: {
    data: {
      message: string;
      errors?: Record<string, string[]>;
    };
  };
};
