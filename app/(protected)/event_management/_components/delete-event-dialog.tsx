import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Event, ServerErrorResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { deleteEvent } from "@/services/event.service";

export default function DeleteEventDialog({
  event,
}: Readonly<{ event: Event }>) {
  const queryClient = useQueryClient();

  const deleteEventMutation = useMutation({
    mutationFn: () => deleteEvent(event.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully", {
        position: "top-right",
      });
    },
    onError: (error: ServerErrorResponse) => {
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    },
  });

  const handleDeleteEvent = () => {
    deleteEventMutation.mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive" className="rounded-full">
          <Trash2 />
          <span className="sr-only">Delete event</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>&quot;{event.title}&quot;</strong>? This will permanently
            remove the event and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteEventMutation.isPending}
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={handleDeleteEvent}
          >
            Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
