"use client";

import { EventWithTopics } from "@/lib/types";
import { getEvent } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * The shape of the context value provided by EventContext.
 */
type EventContextType = {
  /**
   * The ID of the event being managed.
   */
  eventId: string;
  /**
   * The loaded event data, including its associated topics. This will be undefined if the event is still loading or if it failed to load.
   * @type {EventWithTopics | undefined}
   */
  event?: EventWithTopics;
  /**
   * Indicates if the event data is currently being fetched. This can be used to show loading states in the UI.
   */
  eventIsLoading: boolean;
};

/**
 * EventContext.
 * The context object providing event-related state across components.
 */
const EventContext = createContext<EventContextType | undefined>(undefined);

/**
 * EventProvider component.
 * Fetches event data based on the provided ID and provides it via React Context.
 * @param {object} props
 * @param {string} props.id - The ID of the event to fetch and manage.
 * @param {ReactNode} props.children - The child components that consume the context.
 * @returns {React.ReactElement} The Provider component wrapping children.
 */
export function EventProvider({
  id,
  children,
}: Readonly<{ id: string; children: ReactNode }>) {
  const router = useRouter();

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      try {
        return await getEvent(id);
      } catch {
        toast.error("Event not found", {
          position: "top-right",
        });
        router.push("/event_management");
      }
    },
  });

  // Memoize the context values to prevent unnecessary re-renders
  const contextValues = useMemo(
    () => ({ eventId: id, event, eventIsLoading: isLoading }),
    [id, event, isLoading],
  );

  return (
    <EventContext.Provider value={contextValues}>
      {children}
    </EventContext.Provider>
  );
}

/**
 * Custom hook to consume the EventContext.
 * @returns {EventContextType} The context value containing event-related state.
 * @throws Will throw an error if used outside of an EventProvider.
 */
export const useEvent = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }

  return context;
};
