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
import {
  approveTestimonial,
} from "@/services/testimonial.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCheck } from "lucide-react";
import { toast } from "sonner";

/**
 * A dialog to approve a testimonial.
 *
 * @param {Object} props
 * @prop {Testimonial} props.testimonial - The testimonial to approve.
 * @returns {JSX.Element} The approve dialog component.
 */
export default function ApproveTestimonialDialog({
  testimonial,
}: Readonly<{ testimonial: Testimonial }>) {
  const queryClient = useQueryClient();

  const approveTestimonialMutation = useMutation({
    mutationFn: () => approveTestimonial(testimonial.id),
    onSuccess: () => {
      /**
       * Invalidate the cache for the testimonials query.
       */
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      /**
       * Show a success message to the user.
       */
      toast.success("Testimonial approved", {
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
   * The function to call when the user clicks the approve button.
   */
  const handleApproveTestimonial = () => {
    /**
     * Trigger the mutation.
     */
    approveTestimonialMutation.mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" className="rounded-full">
          <CheckCheck />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve testimonial?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to approve this testimonial?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={approveTestimonialMutation.isPending}
            className={cn(buttonVariants({ variant: "default" }))}
            onClick={handleApproveTestimonial}
          >
            Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
