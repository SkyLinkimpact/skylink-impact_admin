"use client";

import MediaUpload from "@/app/_components/media_upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createEventFormSchema } from "@/lib/schemas";
import { CreateEventRequest, ServerErrorResponse } from "@/lib/types";
import { createEvent } from "@/services/event.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

/**
 * Page to create a new event.
 */
export default function CreateNewEventPage() {
  const router = useRouter();

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

  const createEventMutation = useMutation({
    mutationFn: (payload: CreateEventRequest) => createEvent(payload),
    onSuccess: (res) => {
      toast.success("Event created successfully", {
        position: "top-right",
      });
      router.push(`/event_management/edit/${res.id}`);
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

  const handleSubmit = form.handleSubmit((data) => {
    createEventMutation.mutate(data);
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
        <CardDescription>
          Create a new event. You can edit this event later.
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
                  <MediaUpload onChange={field.onChange} />
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
                    <Input
                      type="datetime-local"
                      placeholder="Event URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="flex items-center justify-center w-full"
              disabled={createEventMutation.isPending}
            >
              {createEventMutation.isPending ? (
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
