import { Event } from "@/lib/types";
import { getAllEvents } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

/**
 * Hook to get all events.
 *
 * @returns {{
 *   allEvents: Event[], // All events
 *   isEventsLoading: boolean, // Whether the events are loading
 *   eventsError: Error | null, // Error if the events failed to load
 *   pastEvents: Event[], // Past events
 *   upcomingEvents: Event[] // Upcoming events
 * }}
 */
export default function useEvent(): {
  allEvents?: Event[];
  isEventsLoading: boolean;
  eventsError: Error | null;
  pastEvents?: Event[];
  upcomingEvents?: Event[];
} {
  const { data, isLoading, error } = useQuery({
    /**
     * The query key is used to identify the query.
     * It is also used as the key for the cache.
     */
    queryKey: ["events"],
    /**
     * The function that is used to fetch the data.
     */
    queryFn: getAllEvents,
  });

  /**
   * Filter the events into past events.
   */
  const pastEvents = useMemo(
    () => data?.filter((event) => new Date(event.eventAt) < new Date()),
    [data]
  );

  /**
   * Filter the events into  upcoming events.
   */
  const upcomingEvents = useMemo(
    () => data?.filter((event) => new Date(event.eventAt) >= new Date()),
    [data]
  );

  return {
    allEvents: data,
    isEventsLoading: isLoading,
    eventsError: error,
    pastEvents,
    upcomingEvents,
  };
}
