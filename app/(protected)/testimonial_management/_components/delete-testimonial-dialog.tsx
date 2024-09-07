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
import { ServerErrorResponse, Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";
import { deleteTestimonial } from "@/services/testimonial.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

/**
 * A dialog to delete a testimonial.
 *
 * @param {Object} props
 * @prop {Testimonial} props.testimonial - The testimonial to delete.
 * @returns {JSX.Element} The delete dialog component.
 */
export default function DeleteTestimonialDialog({
  testimonial,
}: Readonly<{ testimonial: Testimonial }>) {
  const queryClient = useQueryClient();

  const deleteTestimonialMutation = useMutation({
    mutationFn: () => deleteTestimonial(testimonial.id),
    onSuccess: () => {
      /**
       * Invalidate the cache for the testimonials query.
       */
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      /**
       * Show a success message to the user.
       */
      toast.success("Testimonial deleted", {
        position: "top-right",
      });
    },
    /**
     * The function to call when the mutation fails.
     *
     * @param {ServerErrorResponse} error - The error from the server.
     */
    onError: (error: ServerErrorResponse) => {
      /**
       * Show an error message to the user.
       */
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    },
  });

  /**
   * The function to call when the user clicks the delete button.
   */
  const handleDeleteTestimonial = () => {
    /**
     * Trigger the mutation.
     */
    deleteTestimonialMutation.mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive" className="rounded-full">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete testimonial?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this testimonial? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteTestimonialMutation.isPending}
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={handleDeleteTestimonial}
          >
            Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
