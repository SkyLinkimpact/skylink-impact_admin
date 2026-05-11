import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createEventTopicFormSchema } from "@/lib/schemas";
import { CreateEventTopicRequest, ServerErrorResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEvent } from "./event-context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MediaUpload from "@/app/_components/media_upload";
import { addEventTopic } from "@/services/event.service";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddEventTopicDialog() {
  const [open, setOpen] = useState(false);

  const { eventId } = useEvent();

  const queryClient = useQueryClient();

  const form = useForm<CreateEventTopicRequest>({
    resolver: zodResolver(createEventTopicFormSchema),
    defaultValues: {
      event_id: eventId,
      title: "",
      speaker: "",
      start_time: undefined,
      description: "",
      media_id: undefined,
    },
  });

  const addEventTopicMutation = useMutation({
    mutationFn: (payload: CreateEventTopicRequest) => addEventTopic(payload),
    onSuccess: () => {
      toast.success("Event topic added successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      setOpen(false);
    },
    onError: (error: ServerErrorResponse) => {
      toast.error(error.response.data.message || "Failed to add event topic");
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log("data", data);
    // addEventTopicMutation.mutate(data);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add Topic
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Event Topic</DialogTitle>
          <DialogDescription>
            Enter the details for the new event topic.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter topic title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter topic description (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speaker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speaker</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter speaker name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="media_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speaker Image</FormLabel>
                  <FormControl>
                    <MediaUpload onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      placeholder="Enter start time"
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
              disabled={addEventTopicMutation.isPending}
            >
              {addEventTopicMutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Add Topic"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
