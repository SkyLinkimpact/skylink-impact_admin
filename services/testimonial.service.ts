import api from "@/lib/api";
import {
  CreateTestimonialRequest,
  PaginatedResponse,
  Testimonial,
} from "@/lib/types";

/**
 * Retrieves all testimonials from the server.
 *
 * @param {number} [page=1] The page of testimonials to retrieve.
 * @return {Promise<PaginatedResponse<Testimonial>>} The testimonials.
 */
export async function getAllTestimonials(
  page = 1,
): Promise<PaginatedResponse<Testimonial>> {
  const response = await api.get<PaginatedResponse<Testimonial>>(
    // Use the page parameter to retrieve the specified page of testimonials
    `/testimonials?filter=all&page=${page}`,
  );
  return response.data;
}

/**
 * Retrieves all pending testimonials from the server.
 *
 * @param {number} [page=1] The page of pending testimonials to retrieve.
 * @return {Promise<PaginatedResponse<Testimonial>>} The pending testimonials.
 *
 * @remarks
 * The `filter=pending` parameter is used to retrieve only the pending testimonials.
 */
export async function getPendingTestimonials(
  page = 1,
): Promise<PaginatedResponse<Testimonial>> {
  const response = await api.get<PaginatedResponse<Testimonial>>(
    // Use the filter parameter to only retrieve pending testimonials
    `/testimonials?filter=pending&page=${page}`,
  );
  // Return the data property of the response
  return response.data;
}

/**
 * Approves a testimonial by ID.
 *
 * @param {string} id - The ID of the testimonial to approve.
 * @return {Promise<void>} A promise that resolves when the testimonial has been approved.
 */
export async function approveTestimonial(id: string): Promise<void> {
  // Approve the testimonial on the server
  await api.patch(`/testimonials/${id}`, { approved: true });
}

/**
 * Deletes a testimonial by ID.
 *
 * @param {string} id - The ID of the testimonial to delete.
 * @return {Promise<void>} A promise that resolves when the testimonial has been deleted.
 */
export async function deleteTestimonial(id: string): Promise<void> {
  // Delete the testimonial from the server
  await api.delete(`/testimonials/${id}`);
}

export async function createTestimonial(
  payload: CreateTestimonialRequest,
): Promise<{ message: string }> {
  // Make a POST request to the server to create a testimonial
  const response = await api.post<{ message: string }>(
    "/testimonials",
    payload,
  );

  // Return the created testimonial
  return response.data;
}
