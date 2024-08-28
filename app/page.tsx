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
import { loginFormSchema } from "@/lib/schemas";
import { ServerErrorResponse, UserLoginRequest } from "@/lib/types";
import { login } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import useUser from "./_hooks/user.hook";
import { useLayoutEffect } from "react";

export default function LoginPage() {
  // Get the router.
  const router = useRouter();

  // Get the user.
  const { user, isUserLoading, userError } = useUser();

  /**
   * This effect is used to redirect the user to the dashboard if they are already
   * logged in.
   */
  useLayoutEffect(() => {
    if (!isUserLoading && user && !userError) { // If the user is logged in
      router.replace("/dashboard");
    }
  }, [user, isUserLoading, userError, router]);

  // Create a form with the login form schema.
  const form = useForm<UserLoginRequest>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (payload: UserLoginRequest) => login(payload),
    onSuccess: (data) => {
      // Set the token in local storage. This is what allows the browser to remember
      // that the user is logged in.
      window.localStorage.setItem("siak", data.token);

      // Show a success message to the user so that they know they have successfully
      // logged in.
      toast.success("Login", {
        description: "Welcome. You have successfully logged in",
        position: "top-right",
      });

      // Redirect the user to the dashboard.
      router.push("/dashboard");
    },
    onError: (error: ServerErrorResponse) => {
      // Get the error message and error fields from the error response.
      const { message, errors } = error.response.data;

      // Show an error message to the user so that they know something went wrong.
      // The message is the error message from the API.
      toast.error("Login", {
        description: message,
        position: "top-right",
      });

      // If there are any errors in the errors object that correspond to fields,
      // set those errors on the corresponding form fields. This is how we
      // display the error messages that the API returns to the user.
      const emailErr = errors?.email;

      if (emailErr) {
        // Set the error on the "email" field of the form to the first error
        // message for the email field returned by the API.
        form.setError("email", {
          type: "custom",
          message: emailErr[0],
        });
      }
    },
  });

  const handleSubmit = form.handleSubmit((payload) => {
    // Call the login mutation with the payload. The payload is the data that
    // the user entered into the form. The mutation is the function that will
    // be called to perform the login request. The function is defined above,
    // and it will be called with the payload as its argument.
    //
    // The mutate function is a function that is returned by the useMutation
    // hook. It is the function that will be called to perform the mutation.
    // The hook will automatically handle the loading state, error state,
    // and success state of the mutation, so we don't need to worry about
    // that here.
    loginMutation.mutate(payload);
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Card className="container max-w-sm select-none">
        <CardHeader>
          <CardTitle className="uppercase">Login</CardTitle>
          <CardDescription>Admin access</CardDescription>
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="flex items-center justify-center w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  "LOGIN"
                )}
              </Button>
              <div className="flex px-0">
                <div className="flex-1" />
                <Link href="/forgot_password">Forgot Password</Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
