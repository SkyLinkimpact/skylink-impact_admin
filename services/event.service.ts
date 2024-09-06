import api from "@/lib/api";
import { CreateEventRequest, Event } from "@/lib/types";

/**
 * Retrieves all events from the server.
 *
 * @return {Promise<Event[]>} - A promise that resolves to an array of event objects.
 */
export async function getAllEvents(): Promise<Event[]> {
  const response = await api.get<Event[]>("/events");
  return response.data;
}

/**
 * Retrieves an event by ID from the server.
 *
 * @param {string} id - The ID of the event to retrieve.
 * @return {Promise<Event>} - A promise that resolves to an event object.
 */
export async function getEvent(id: string): Promise<Event> {
  // Make a GET request to the server to retrieve an event by ID
  const response = await api.get<Event>(`/events/${id}`);

  // Return the event
  return response.data;
}

/**
 * Deletes an event by ID.
 *
 * @param {string} id - The ID of the event to delete.
 * @return {Promise<void>} - A promise that resolves when the event has been deleted.
 */
export async function deleteEvent(id: string): Promise<void> {
  // Make a DELETE request to the server to delete an event by ID
  await api.delete(`/events/${id}`);
}

/**
 * Creates a new event.
 *
 * @param {CreateEventRequest} payload - The request to create an event.
 * @return {Promise<Event>} - A promise that resolves to the created event.
 */
export async function createEvent(payload: CreateEventRequest): Promise<Event> {
  // Make a POST request to the server to create an event
  const response = await api.post<Event>("/events", payload);

  // Return the created event
  return response.data;
}
