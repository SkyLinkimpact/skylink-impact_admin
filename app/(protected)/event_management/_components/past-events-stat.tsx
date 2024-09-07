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
 * The component to display the number of past events.
 *
 * @remarks
 * - Fetches the list of all past events from the server.
 * - Displays the number of past events.
 * - Displays a loader if the events are not loaded yet.
 */
export default function PastEventsStat() {
  const { pastEvents, isEventsLoading } = useEvent();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Past</CardTitle>
        <CardDescription>
          Number of past events
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* The loader to show while the events are being loaded */}
        {isEventsLoading && (
          <div className="flex justify-center w-full">
            <Loader className="animate-spin" />
          </div>
        )}
        <p className="text-2xl font-bold">{pastEvents?.length}</p>
      </CardContent>
    </Card>
  );
}
