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
import { updateBlogFormSchema } from "@/lib/schemas";
import { ServerErrorResponse, UpdateBlogRequest } from "@/lib/types";
import { getBlog, updateBlog } from "@/services/blog.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Editor from "@/app/(protected)/blog_management/_components/editor";

/**
 * The page to edit an existing blog post.
 *
 * @param {Object} props
 * @prop {string} props.id - The ID of the blog post to edit.
 */
export default function EditBlogPage({
  params: { id },
}: Readonly<{ params: { id: string } }>) {
  const router = useRouter();

  const queryClient = useQueryClient();
  
  const { data: blog, isLoading: isBlogLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      try {
        return await getBlog(id);
      } catch (error) {
        toast.error("Blog post not found", {
          position: "top-right",
        });
        router.push("/blog_management");
      }
    },
  });

  const form = useForm<UpdateBlogRequest>({
    /**
     * The resolver to validate the form data.
     */
    resolver: zodResolver(updateBlogFormSchema),
    /**
     * The default values for the form fields.
     */
    defaultValues: {
      title: "",
      content: "",
      media_id: "",
      isDraft: true,
    },
  });
  
  const updateBlogMutation = useMutation({
    mutationFn: (payload: UpdateBlogRequest) => updateBlog(id, payload),
    onSuccess: () => {
      toast.success("Blog successfully updated", {
        position: "top-right",
      });
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
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

  const handleSubmit = form.handleSubmit((data) => {
    updateBlogMutation.mutate(data);
  });

  useEffect(() => {
    if (blog) {
      form.setValue("content", blog.content);
      form.setValue("title", blog.title);
      form.setValue("media_id", blog.thumbnail?.id ?? "");
      form.setValue("isDraft", blog.publishedAt === null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blog]);

  if (isBlogLoading) {
    return (
      <div className="flex items-center justify-center h-56">
        <Loader className="animate-spin size-24" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Edit Blog - <span className="text-muted-foreground">{id}</span>
        </CardTitle>
        <CardDescription>
          Edit an existing blog post. You can change the title, content, or
          publish status.
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
                    imgUrl={blog?.thumbnail?.url}
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <div className="border rounded-md p-2">
                    <Editor
                      initialValue={blog?.content}
                      onValueChange={field.onChange}
                    />
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
              disabled={updateBlogMutation.isPending}
            >
              {updateBlogMutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "UPDATE"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
