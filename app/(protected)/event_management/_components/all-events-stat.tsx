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
 * The component to display the number of all events.
 *
 * @remarks
 * - Fetches the list of all events from the server.
 * - Displays the number of all events.
 * - Displays a loader if the events are not loaded yet.
 */
export default function AllEventsStat(): JSX.Element {
  const { allEvents, isEventsLoading } = useEvent();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>All</CardTitle>
        <CardDescription>Number of all events</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Loader */}
        {isEventsLoading && (
          <div className="flex justify-center w-full">
            <Loader className="animate-spin" />
          </div>
        )}
        {/* Stat */}
        <p className="text-2xl font-bold">{allEvents?.length}</p>
      </CardContent>
    </Card>
  );
}
