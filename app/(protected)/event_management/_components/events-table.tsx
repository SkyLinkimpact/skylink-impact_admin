import useEvent from "@/app/_hooks/event.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatTime } from "@/lib/utils";
import { Edit2, Loader, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteEventDialog from "./delete-event-dialog";

export default function EventsTable() {
  const { allEvents, isEventsLoading } = useEvent();
  const router = useRouter(); // The router for navigation.
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
      </CardHeader>

      <CardContent
        className={cn(
          "min-h-20",
          isEventsLoading && "flex items-center justify-center"
        )}
      >
        {isEventsLoading && <Loader className="size-16 animate-spin" />}

        {!isEventsLoading && allEvents && allEvents.length < 1 && (
          <div className="text-center flex flex-col items-center gap-9">
            <p>Nothing to see here</p>
            <Search className="size-14 animate-bounce" />
          </div>
        )}

        {allEvents && allEvents.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Title</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {allEvents.map((event, index) => (
                <TableRow key={event.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>
                    <a href={event.url} target="_blank">
                      {event.url}
                    </a>
                  </TableCell>
                  <TableCell>{formatTime(event.eventAt)}</TableCell>
                  <TableCell className="flex flex-col md:flex-row gap-4">
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full"
                      onClick={() =>
                        router.push(`/event_management/edit/${event.id}`)
                      }
                    >
                      <Edit2 />
                    </Button>
                    <DeleteEventDialog event={event} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
