"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/**
 * The layout component for the blog management pages.
 *
 */
export default function BlogManagementLayout({
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
        {/* A link back to the main blog management page */}
        <Button onClick={() => router.push("/blog_management")}>
          &larr; Back
        </Button>
        {/* Spacer element to fill the rest of the row */}
        <div className="flex-1" />
      </div>
      {/* The actual blog management page content */}
      {children}
    </div>
  );
}
