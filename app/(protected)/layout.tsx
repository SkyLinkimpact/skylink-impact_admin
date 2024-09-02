"use client";

import useUser from "@/app/_hooks/user.hook";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * This component wraps the main dashboard pages and makes sure that the user
 * is logged in. If the user is not logged in, it redirects them to the login
 * page. If the user is logged in, it renders the children components.
 */
export default function ProtectedLayout({
  children,
}: Readonly<{
  /**
   * The children components that will be rendered if the user is logged in.
   */
  children: React.ReactNode;
}>) {
  const { user, isUserLoading, userError } = useUser();

  const router = useRouter();

  /**
   * This effect is used to redirect the user to the login page if they are not
   * logged in.
   */
  useLayoutEffect(() => {
    if (!isUserLoading && !user && userError) {
      router.replace("/");
    }
  }, [user, isUserLoading, userError, router]);

  return (
    <div
      className={cn(
        "w-full md:container h-full",
        isUserLoading && "flex items-center justify-center"
      )}
    >
      {isUserLoading ? <Loader className="animate-spin size-24" /> : children}
    </div>
  );
}
