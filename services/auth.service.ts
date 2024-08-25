import api from "@/lib/api";
import { User, UserLoginRequest } from "@/lib/types";

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
