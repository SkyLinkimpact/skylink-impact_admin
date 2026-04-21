"use client";

import Link from "next/link";
import AllTestimonialStat from "./_components/all-testimonial-stat";
import PendingTestimonialStat from "./_components/pending-testimonial-stat";
import TestimonialTable from "./_components/testimonial-table";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function TestimonialManagementPage() {
  return (
    <div className="space-y-6 w-full pt-4 px-4 lg:px-0">
      <div className="flex flex-col space-y-1.5 p-6 border-b">
        <h3 className="uppercase">Testimonial Management</h3>
        <p>Manage testimonials. View, approve or delete testimonials.</p>
      </div>

      <div className="flex">
        <div className="flex-1"></div>
        <Link
          className={cn(buttonVariants({ variant: "outline" }))}
          href="/testimonial_management/new"
        >
          Create New &#43;
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AllTestimonialStat />
        <PendingTestimonialStat />
      </div>

      <TestimonialTable />
    </div>
  );
}
