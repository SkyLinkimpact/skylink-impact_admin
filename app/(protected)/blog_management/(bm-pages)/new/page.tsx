"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createBlogFormSchema } from "@/lib/schemas";
import { CreateBlogRequest, ServerErrorResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Editor from "@/app/(protected)/blog_management/_components/editor";
import MediaUpload from "@/app/_components/media_upload";
import { useMutation } from "@tanstack/react-query";
import { createBlog } from "@/services/blog.service";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * The page to create a new blog post.
 */
export default function CreateNewBlogPage() {
  /**
   * The router for the page.
   */
  const router = useRouter();

  /**
   * The form state for the blog post.
   */
  const form = useForm<CreateBlogRequest>({
    /**
     * The resolver to validate the form data.
     */
    resolver: zodResolver(createBlogFormSchema),
    /**
     * The default values for the form fields.
     */
    defaultValues: {
      title: "",
      content: "",
      isDraft: false,
      media_id: "",
    },
  });

  /**
   * The mutation to create a new blog post.
   */
  const createBlogMutation = useMutation({
    mutationFn: (data: CreateBlogRequest) => createBlog(data),
    onSuccess: (res) => {
      toast.success("Blog created successfully", {
        position: "top-right",
      });
      router.push(`/blog_management/edit/${res.id}`);
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

      if (error.response.data.errors?.content) {
        form.setError("content", {
          type: "custom",
          message: error.response.data.errors.content[0],
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
   * The function to handle the form submission.
   */
  const handleSubmit = form.handleSubmit((data) => {
    createBlogMutation.mutate(data);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Blog</CardTitle>
        <CardDescription>
          Create a new blog post. You can edit this post later.
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <div className="border rounded-md p-2">
                    <Editor onValueChange={field.onChange} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isDraft"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Save As Draft</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        form.setValue("isDraft", value === "true");
                      }}
                      defaultValue={field.value ? "true" : "false"}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="flex items-center justify-center w-full"
              disabled={createBlogMutation.isPending}
            >
              {createBlogMutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "PUBLISH"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
