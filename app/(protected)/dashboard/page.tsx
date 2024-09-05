"use client";

import useUser from "@/app/_hooks/user.hook";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServerErrorResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { logout } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LibraryBig, Loader, LogOut, Mic, Tickets } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * Generates a greeting message based on the current time of day.
 *
 * @param name The name of the person to greet.
 * @returns A string greeting message.
 */
const greet = (name: string): string => {
  const currentHour = new Date().getHours();

  // Determine the correct greeting based on the current time of day
  const greeting =
    currentHour < 12 ? "Morning" : currentHour < 18 ? "Afternoon" : "Evening";

  // Return the greeting message with the name inserted
  return `Good ${greeting}, ${name}!`;
};

export default function DashboardPage() {
  const { user } = useUser();

  const router = useRouter();

  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (res) => {
      toast.success("Logout", {
        description: res.message,
        position: "top-right",
      });

      window.localStorage.removeItem("siak");

      queryClient.invalidateQueries({ queryKey: ["user"] });

      queryClient.clear();

      router.push("/");
    },

    onError: (err: ServerErrorResponse) => {
      toast.error("Logout", {
        description: err.response.data.message,
        position: "top-right",
      });
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Card className="container min-h-60 md:h-[30rem] lg:max-w-screen-md overflow-auto">
        <CardHeader>
          <CardTitle>{greet(user?.name ?? "Admin")}</CardTitle>
          <CardDescription>What do you want to do today?</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-4 md:h-[28rem] lg:h-[30rem]">
          <Link
            href={"/blog_management"}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "group flex-col h-full"
            )}
          >
            <LibraryBig className="size-8 md:size-16 group-hover:scale-105" />
            <span className="text-center w-[10ch] text-wrap group-hover:font-semibold">
              Blog Management
            </span>
          </Link>

          <Link
            href={"/event_management"}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "group flex-col h-full"
            )}
          >
            <Tickets className="size-8 md:size-16 group-hover:scale-105" />
            <span className="text-center w-[10ch] text-wrap group-hover:font-semibold">
              Event Management
            </span>
          </Link>

          <Link
            href={"/testimonial_management"}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "group flex-col h-full"
            )}
          >
            <Mic className="size-8 md:size-16 group-hover:scale-105" />
            <span className="text-center w-[10ch] text-wrap group-hover:font-semibold">
              Testimonial Management
            </span>
          </Link>

          <Button
            variant="destructive"
            className="group flex-col h-full"
            disabled={logoutMutation.isPending}
            onClick={() => logoutMutation.mutate()}
          >
            {!logoutMutation.isPending ? (
              <>
                <LogOut className="size-8 md:size-16 group-hover:scale-105" />
                <span className="text-center w-[10ch] text-wrap group-hover:font-semibold">
                  Logout
                </span>
              </>
            ) : (
              <Loader className="size-20 animate-spin group-hover:scale-105" />
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
