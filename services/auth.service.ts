import api from "@/lib/api";
import {
  User,
  UserLoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/lib/types";

/**
 * Authenticates a user with the provided login credentials.
 *
 * @param {UserLoginRequest} payload - The user's login credentials.
 * @return {Promise<{ token: string }>} The authentication token.
 */
export async function login(
  payload: UserLoginRequest
): Promise<{ token: string }> {
  const response = await api.post<{ token: string }>("login", payload);
  return response.data;
}

/**
 * Retrieves the current user.
 *
 * @return {Promise<User>} The current user.
 */
export async function getUser(): Promise<User> {
  const response = await api.get<User>("user");
  return response.data;
}

/**
 * Sends a request to the server to reset the password for a user.
 *
 * @param {ForgotPasswordRequest} payload - The payload containing the user's email address.
 * @return {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 */
export async function forgotPassword(
  payload: ForgotPasswordRequest
): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>(
    "forgot_password",
    payload
  );
  return response.data;
}

/**
 * Resets a user's password.
 *
 * @param {ResetPasswordRequest} payload - The payload containing the user's new password and token.
 * @return {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 */
export async function resetPassword(
  payload: ResetPasswordRequest
): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>(
    "reset_password",
    payload
  );

  return response.data;
}
