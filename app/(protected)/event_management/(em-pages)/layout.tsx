"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/**
 * The layout component for the event management pages.
 *
 */
export default function EventManagementLayout({
  /**
   * The children components that will be rendered if the user is logged in.
   */
  children,
}: Readonly<{
  /**
   * The children components that will be rendered if the user is logged in.
   */
  children: React.ReactNode;
}>): JSX.Element {
  const router = useRouter();

  return (
    <div className="w-full space-y-6">
      <div className="flex pt-4">
        {/* A link back to the main event management page */}
        <Button onClick={() => router.push("/event_management")}>
          &larr; Back
        </Button>
        {/* Spacer element to fill the rest of the row */}
        <div className="flex-1" />
      </div>
      {/* The actual event management page content */}
      {children}
    </div>
  );
}
