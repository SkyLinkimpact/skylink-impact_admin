import useEvent from "@/app/_hooks/event.hook";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Loader } from "lucide-react";

/**
 * The component to display the number of upcoming events.
 *
 * @remarks
 * - Fetches the list of all upcoming events from the server.
 * - Displays the number of upcoming events.
 * - Displays a loader if the events are not loaded yet.
 */
export default function UpcomingEventsStat() {
  const { upcomingEvents, isEventsLoading } = useEvent();

  // The number of upcoming events or a loader if the events are not loaded yet
  const content = isEventsLoading ? (
    <div className="flex justify-center w-full">
      <Loader className="animate-spin" />
    </div>
  ) : (
    <p className="text-2xl font-bold">{upcomingEvents?.length}</p>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upcoming</CardTitle>
        <CardDescription>Number of all upcoming events</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
