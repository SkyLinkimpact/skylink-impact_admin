import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useEvent } from "./event-context";
import { cn } from "@/lib/utils";
import AddEventTopicDialog from "./add-event-topic-dialog";
import Image from "next/image";

export default function EventTopics() {
  const { event, eventIsLoading } = useEvent();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Topics</CardTitle>
        <CardDescription>View all event topics.</CardDescription>
      </CardHeader>

      <CardContent>
        <div
          className={cn(
            "w-full flex flex-col",
            (eventIsLoading || (event && event.topics.length > 0)) &&
              " py-20 items-center justify-center",
          )}
        >
          {eventIsLoading && <Loader className="animate-spin" />}
          {event?.topics.length === 0 && !eventIsLoading && (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-sm text-muted-foreground">
                No event topics found.
              </p>
              <AddEventTopicDialog />
            </div>
          )}

          {event && event.topics.length > 0 && (
            <div className="w-full flex flex-col gap-4">
              {event?.topics.map((topic) => (
                <div key={topic.id} className="p-4 gap-4 border rounded-md flex">
                  <Image
                    src={
                      topic.speakerImage?.url ||
                      "/assets/favicon/android-chrome-512x512.png"
                    }
                    alt={topic.title}
                    width={100}
                    height={100}
                    className="rounded-md p-2 border"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">{topic.title}</h3>
                    <p>{topic.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {topic.speaker} -{" "}
                      {new Date(topic.startTime).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              <AddEventTopicDialog />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
