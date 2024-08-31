import api from "@/lib/api";
import { Blog, PaginatedResponse } from "@/lib/types";

/**
 * Retrieves all blogs.
 *
 * @param {number} [page=1] The page of blogs to retrieve.
 * @return {Promise<PaginatedResponse<Blog>>} The blogs.
 */
export async function getAllBlogs(
  page: number = 1
): Promise<PaginatedResponse<Blog>> {
  const response = await api.get<PaginatedResponse<Blog>>(`blog?page=${page}`);

  return response.data;
}

/**
 * Retrieves all published blogs.
 *
 * @param {number} [page=1] The page of blogs to retrieve.
 * @return {Promise<PaginatedResponse<Blog>>} The published blogs.
 */
export async function getAllPublishedBlogs(
  page: number = 1
): Promise<PaginatedResponse<Blog>> {
  const response = await api.get<PaginatedResponse<Blog>>(
    `blog?page=${page}&filter=published`
  );

  return response.data;
}

/**
 * Retrieves all draft blogs.
 *
 * @param {number} [page=1] The page of draft blogs to retrieve.
 * @return {Promise<PaginatedResponse<Blog>>} The draft blogs.
 */
export async function getAllDraftBlogs(
  page: number = 1
): Promise<PaginatedResponse<Blog>> {
  const response = await api.get<PaginatedResponse<Blog>>(
    `blog?page=${page}&filter=drafts`
  );

  return response.data;
}
