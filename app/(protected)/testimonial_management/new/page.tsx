"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { CreateTestimonialRequest, ServerErrorResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTestimonialFormSchema } from "@/lib/schemas";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createTestimonial } from "@/services/testimonial.service";

export default function CreateNewTestimonialPage() {
  const router = useRouter();

  const form = useForm<CreateTestimonialRequest>({
    resolver: zodResolver(createTestimonialFormSchema),
    defaultValues: {
      name: "",
      comment: "",
    },
  });

  const saveTestimonialMutation = useMutation({
    mutationFn: (payload: CreateTestimonialRequest) =>
      createTestimonial(payload),
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
      });

      form.reset();
    },

    onError: (err: ServerErrorResponse) => {
      toast.error(err.response.data.message, {
        position: "top-right",
      });

      if (err.response.data.errors?.name) {
        form.setError("name", {
          message: err.response.data.errors.name.join(", "),
        });
      }

      if (err.response.data.errors?.comment) {
        form.setError("comment", {
          message: err.response.data.errors.comment.join(", "),
        });
      }
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    saveTestimonialMutation.mutate(data);
  });
  return (
    <div className="w-full space-y-6">
      <div className="flex pt-4">
        {/* A link back to the main event management page */}
        <Button onClick={() => router.push("/testimonial_management")}>
          &larr; Back
        </Button>
        {/* Spacer element to fill the rest of the row */}
        <div className="flex-1" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create New Testimonial</CardTitle>
          <CardDescription>
            Create a new testimonial. You can edit this testimonial later.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter comment here"
                        {...field}
                        rows={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="flex items-center justify-center w-full"
                disabled={saveTestimonialMutation.isPending}
              >
                {saveTestimonialMutation.isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  "SAVE TESTIMONIAL"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
