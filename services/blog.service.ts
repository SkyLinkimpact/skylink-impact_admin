import api from "@/lib/api";
import {
  Blog,
  CreateBlogRequest,
  PaginatedResponse,
  UpdateBlogRequest,
} from "@/lib/types";

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

/**
 * Deletes a blog post.
 *
 * @param {string} id - The ID of the blog post to delete.
 * @return {Promise<void>} A promise that resolves when the blog post has been deleted.
 */
export async function deleteBlog(id: string): Promise<void> {
  // Remove the blog post from the server
  await api.delete(`blog/${id}`);
}

/**
 * Creates a new blog post.
 *
 * @param {CreateBlogRequest} payload - The payload of the request.
 * @return {Promise<Blog>} The created blog post.
 */
export async function createBlog(payload: CreateBlogRequest): Promise<Blog> {
  /**
   * Make a POST request to the server to create a new blog post.
   */
  const response = await api.post<Blog>("blog", payload);

  /**
   * Return the created blog post.
   */
  return response.data;
}

/**
 * Retrieves a blog post by ID.
 *
 * @param {string} id - The ID of the blog post to retrieve.
 * @return {Promise<Blog>} The blog post.
 */
export async function getBlog(id: string): Promise<Blog> {
  /**
   * Make a GET request to the server to retrieve a blog post by ID.
   */
  const response = await api.get<Blog>(`blog/${id}`);

  /**
   * Return the retrieved blog post.
   */
  return response.data;
}

/**
 * Updates a blog post.
 *
 * @param {string} id - The ID of the blog post to update.
 * @param {UpdateBlogRequest} payload - The payload of the request.
 * @return {Promise<void>} A promise that resolves when the blog post has been updated.
 */
export async function updateBlog(
  id: string,
  payload: UpdateBlogRequest
): Promise<void> {
  /**
   * Make a PATCH request to the server to update a blog post.
   */
  await api.patch<Blog>(`blog/${id}`, payload);
}
