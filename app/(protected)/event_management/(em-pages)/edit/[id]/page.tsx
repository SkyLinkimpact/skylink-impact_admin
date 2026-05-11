"use client";

import EditEventForm from "./_components/edit-event-form";
import EventTopics from "./_components/event-topics";

/**
 * The page to edit an existing event.
 *
 * @param {Object} props
 * @prop {string} props.id - The ID of the event to edit.
 */
export default function UpdateEventPage() {
  return (
    <div className="flex flex-col gap-6">
      <EditEventForm />
      <EventTopics />
    </div>
  );
}
