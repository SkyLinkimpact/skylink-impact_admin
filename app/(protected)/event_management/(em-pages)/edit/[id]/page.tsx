"use client";

import MediaUpload from "@/app/_components/media_upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createEventFormSchema } from "@/lib/schemas";
import { CreateEventRequest, ServerErrorResponse } from "@/lib/types";
import { getEvent, updateEvent } from "@/services/event.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

/**
 * The page to edit an existing event.
 *
 * @param {Object} props
 * @prop {string} props.id - The ID of the event to edit.
 */
export default function UpdateEventPage({
  params: { id },
}: Readonly<{ params: { id: string } }>) {
  const router = useRouter();

  const queryClient = useQueryClient();

  /**
   * Get the event by ID.
   */
  const { data: event, isLoading: isEventLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      try {
        return getEvent(id);
      } catch (error) {
        toast.error("Event not found", {
          position: "top-right",
        });
        router.push("/event_management");
      }
    },
  });

  /**
   * The form for editing the event.
   */
  const form = useForm<CreateEventRequest>({
    /**
     * The resolver to validate the form data.
     */
    resolver: zodResolver(createEventFormSchema),
    /**
     * The default values for the form fields.
     */
    defaultValues: {
      title: "",
      url: "",
      event_at: "",
      media_id: "",
    },
  });

  /**
   * The mutation to update the event.
   */
  const updateEventMutation = useMutation({
    mutationFn: (payload: CreateEventRequest) => updateEvent(id, payload),
    onSuccess: (res) => {
      toast.success("Event created successfully", {
        position: "top-right",
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
    },
    onError: (error: ServerErrorResponse) => {
      toast.error(error.response.data.message, {
        position: "top-right",
      });

      if (error.response.data.errors?.title) {
        form.setError("title", {
          type: "custom",
          message: error.response.data.errors.title[0],
        });
      }

      if (error.response.data.errors?.url) {
        form.setError("url", {
          type: "custom",
          message: error.response.data.errors.url[0],
        });
      }

      if (error.response.data.errors?.event_at) {
        form.setError("event_at", {
          type: "custom",
          message: error.response.data.errors.event_at[0],
        });
      }

      if (error.response.data.errors?.media_id) {
        form.setError("media_id", {
          type: "custom",
          message: error.response.data.errors.media_id[0],
        });
      }
    },
  });

  /**
   * Handle form submission.
   */
  const handleSubmit = form.handleSubmit((data) => {
    console.log("data", data);
    updateEventMutation.mutate(data);
  });

  useEffect(() => {
    if (event) {
      /**
       * Set the form values from the event.
       */
      form.setValue("title", event.title);
      form.setValue("url", event.url);
      form.setValue("media_id", event.thumbnail?.id ?? "");

      const localDate = new Date(event.eventAt);
      const offset = localDate.getTimezoneOffset();
      localDate.setMinutes(localDate.getMinutes() - offset); // Adjust for timezone offset
      form.setValue("event_at", localDate.toISOString().slice(0, 16)); // Format the date correctly
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Edit Event - <span className="text-muted-foreground">{id}</span>
        </CardTitle>
        <CardDescription>
          Edit an existing event. You can change the title, thumbnail, URL, or
          date/time.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="media_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <MediaUpload
                    imgUrl={event?.thumbnail?.url}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Event URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="event_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date/Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="flex items-center justify-center w-full"
              disabled={updateEventMutation.isPending}
            >
              {updateEventMutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "SAVE EVENT"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
