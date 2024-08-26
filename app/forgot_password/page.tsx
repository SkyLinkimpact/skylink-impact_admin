"use client";
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
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordFormSchema } from "@/lib/schemas";
import { ForgotPasswordRequest } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { forgotPassword } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";

/**
 * The forgot password page.
 */
export default function ForgotPasswordPage() {
  /**
   * The React Hook Form form object.
   */
  const form = useForm<ForgotPasswordRequest>({
    /**
     * The resolver function that is used to validate the form data. In this
     * case, we are using the `zodResolver` from `@hookform/resolvers/zod` to
     * validate the form data using the `forgotPasswordFormSchema`.
     */
    resolver: zodResolver(forgotPasswordFormSchema),
    /**
     * The default values for the form fields.
     */
    defaultValues: {
      email: "",
    },
  });

  /**
   * The mutation function that is called when the form is submitted. It takes
   * the form data as an argument and sends a request to the server to reset
   * the password for the user with the specified email address.
   */
  const forgotPasswordMutation = useMutation({
    /**
     * The function that is called when the mutation is successful. It shows a
     * success message to the user with the message from the server.
     */
    mutationFn: (payload: ForgotPasswordRequest) => forgotPassword(payload),
    /**
     * The function that is called when the mutation is successful. It shows a
     * success message to the user with the message from the server.
     */
    onSuccess: (data) => {
      toast.success("Forgot Password", {
        description: data.message,
        position: "top-right",
      });
    },
  });

  /**
   * The function that is called when the form is submitted. It takes the form
   * data as an argument and calls the `forgotPasswordMutation.mutate` function
   * to send the request to the server.
   */
  const handleSubmit = form.handleSubmit((payload) => {
    forgotPasswordMutation.mutate(payload);
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Card className="container max-w-sm select-none">
        <CardHeader>
          <CardTitle className="uppercase">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex px-0 gap-4 items-center">
                <Button
                  type="submit"
                  className="flex items-center justify-center flex-1"
                  disabled={forgotPasswordMutation.isPending}
                >
                  {forgotPasswordMutation.isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "SEND REQUEST"
                  )}
                </Button>
                <Link href="/">&larr; Back</Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
