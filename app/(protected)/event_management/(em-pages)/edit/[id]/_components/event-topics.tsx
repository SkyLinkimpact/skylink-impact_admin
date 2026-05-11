import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEvent } from "./event-context";
import Image from "next/image";
import AddEventTopicDialog from "./add-event-topic-dialog";

export default function EventTopics() {
  const { event, eventIsLoading } = useEvent();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Event Topics</CardTitle>
          <CardDescription>
            Manage the agenda and speakers for this event.
          </CardDescription>
        </div>

        {event && event.topics.length > 0 && <AddEventTopicDialog />}
      </CardHeader>

      <CardContent>
        {/* Loading State */}
        {eventIsLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">
              Loading topics...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!eventIsLoading && event?.topics.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-6 opacity-40">📅</div>
            <h3 className="text-lg font-medium">No topics yet</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Add the first topic to build your event agenda.
            </p>
            <AddEventTopicDialog />
          </div>
        )}

        {/* Topics List */}
        {!eventIsLoading && event && event.topics.length > 0 && (
          <div className="space-y-4">
            {event.topics.map((topic) => (
              <div
                key={topic.id}
                className="flex gap-4 p-4 border rounded-xl hover:shadow-sm transition-shadow"
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={
                      topic.speakerImage?.url ||
                      "/assets/favicon/android-chrome-512x512.png"
                    }
                    alt={topic.speaker || "Speaker"}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover border"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg leading-tight">
                    {topic.title}
                  </h3>

                  {topic.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {topic.description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {topic.speaker && (
                      <p>
                        <span className="text-muted-foreground">Speaker:</span>{" "}
                        <span className="font-medium">{topic.speaker}</span>
                      </p>
                    )}
                    {topic.startTime && (
                      <p>
                        <span className="text-muted-foreground">Starts:</span>{" "}
                        {new Date(topic.startTime).toLocaleString([], {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Add button at bottom when topics exist */}
            <div className="pt-4">
              <AddEventTopicDialog />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
