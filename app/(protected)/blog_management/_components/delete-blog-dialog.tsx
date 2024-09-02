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
import { Blog, ServerErrorResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { deleteBlog } from "@/services/blog.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

/**
 * A dialog to delete a blog post.
 *
 * @param {Object} props
 * @prop {Blog} props.blog - The blog post to delete.
 * @returns {JSX.Element} The delete dialog component.
 */
export default function DeleteBlogDialog({ blog }: Readonly<{ blog: Blog }>) {
  const queryClient = useQueryClient();

  /**
   * The mutation to delete a blog post.
   *
   * @type {import("@tanstack/react-query").UseMutationResult}
   */
  const deleteBlogMutation = useMutation({
    /**
     * The function to call when the mutation is triggered.
     *
     * @returns {Promise<void>} A promise that resolves when the blog post has been deleted.
     */
    mutationFn: () => deleteBlog(blog.id),
    /**
     * The function to call when the mutation is successful.
     */
    onSuccess: () => {
      /**
       * Invalidate the cache for the blog posts.
       */
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      /**
       * Show a success message to the user.
       */
      toast.success("Blog deleted", {
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
  const handleDeleteBlog = () => {
    /**
     * Trigger the mutation.
     */
    deleteBlogMutation.mutate();
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
          <AlertDialogTitle>Delete blog?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>&quot;{blog.title}&quot;</strong>? This will permanently
            remove the blog post and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteBlogMutation.isPending}
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={handleDeleteBlog}
          >
            Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
