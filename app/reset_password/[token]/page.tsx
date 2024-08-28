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
import { resetPasswordFormSchema } from "@/lib/schemas";
import { ResetPasswordRequest, ServerErrorResponse } from "@/lib/types";
import { resetPassword } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPasswordPage({
  params: { token }, // The token that was sent to the user via email
}: {
  params: { token: string }; // The shape of the params that are passed to this page
}) {
  // Create a form with a schema that matches the shape of the server's response
  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(resetPasswordFormSchema), // Use the schema to validate the form
    defaultValues: {
      password: "", // The new password
      password_confirmation: "", // The confirmation of the new password
      token: "", // The token that was sent to the user via email
    },
  });

  // Get the router so we can navigate after a successful mutation
  const router = useRouter();

  // Create a mutation that sends a request to the server to reset the password
  const resetPasswordMutation = useMutation({
    mutationFn: (payload: ResetPasswordRequest) => resetPassword(payload), // The function that sends the request
    onSuccess: (data) => {
      // If the mutation is successful, show a success message and navigate to the home page
      toast.success("Reset Password", {
        description: data.message,
        position: "top-right",
      });

      router.replace("/");
    },

    onError: (error: ServerErrorResponse) => {
      // If the mutation fails, show an error message and set the appropriate errors on the form
      const { message, errors } = error.response.data;
      toast.error("Reset Password", {
        description: message,
        position: "top-right",
      });

      if (errors?.password) {
        // If there is an error with the password, set the error on the form
        form.setError("password", { message: errors.password[0] });

        return;
      }

      if (errors?.password_confirmation) {
        // If there is an error with the confirmation of the password, set the error on the form
        form.setError("password_confirmation", {
          message: errors.password_confirmation[0],
        });

        return;
      }

      // If there are no errors, navigate to the home page
      router.replace("/");
    },
  });

  // Get the function that will be called when the form is submitted
  const handleSubmit = form.handleSubmit((payload) => {
    // Call the mutation with the payload
    resetPasswordMutation.mutate(payload);
  });

  // When the component mounts, set the token on the form
  useEffect(() => {
    form.setValue("token", token);
  }, [form, token]);
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Card className="container max-w-sm select-none">
        <CardHeader>
          <CardTitle className="uppercase">Reset Password</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex px-0 gap-4 items-center">
                <Button
                  type="submit"
                  className="flex items-center justify-center flex-1"
                  disabled={resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "CHANGE PASSWORD"
                  )}
                </Button>
                <Link href="/">&larr; Cancel</Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
