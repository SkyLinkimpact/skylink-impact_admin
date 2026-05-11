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
import { updateEvent } from "@/services/event.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEvent } from "./event-context";

export default function EditEventForm() {
  const { event, eventId: id } = useEvent();
  const queryClient = useQueryClient();

  const form = useForm<CreateEventRequest>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      title: "",
      url: "",
      event_at: "",
      media_id: undefined,
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: (payload: CreateEventRequest) => updateEvent(id, payload),
    onSuccess: () => {
      toast.success("Event updated successfully", { position: "top-right" });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
    },
    onError: (error: ServerErrorResponse) => {
      const message = error.response?.data?.message || "Failed to update event";
      toast.error(message, { position: "top-right" });

      // Server-side validation errors
      const errors = error.response?.data?.errors;
      if (errors?.title) form.setError("title", { message: errors.title[0] });
      if (errors?.url) form.setError("url", { message: errors.url[0] });
      if (errors?.event_at)
        form.setError("event_at", { message: errors.event_at[0] });
      if (errors?.media_id)
        form.setError("media_id", { message: errors.media_id[0] });
    },
  });

  // Populate form when event data is available
  useEffect(() => {
    if (!event) return;

    const localDate = new Date(event.eventAt);
    const formattedDate = localDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm

    form.reset({
      title: event.title,
      url: event.url || "",
      media_id: event.thumbnail?.id || undefined,
      event_at: formattedDate,
    });
  }, [event, form]);

  const onSubmit = form.handleSubmit((data) => {
    updateEventMutation.mutate(data);
  });

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
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Thumbnail */}
            <FormField
              control={form.control}
              name="media_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <MediaUpload
                      onChange={field.onChange}
                      value={field.value}
                      imgUrl={event?.thumbnail?.url}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date & Time */}
            <FormField
              control={form.control}
              name="event_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date & Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={updateEventMutation.isPending}
            >
              {updateEventMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  SAVING CHANGES...
                </>
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
