"use client";

import AllTestimonialStat from "./_components/all-testimonial-stat";
import PendingTestimonialStat from "./_components/pending-testimonial-stat";
import TestimonialTable from "./_components/testimonial-table";

export default function TestimonialManagementPage() {
  return (
    <div className="space-y-6 w-full pt-4 px-4 lg:px-0">
      <div className="flex flex-col space-y-1.5 p-6 border-b">
        <h3 className="uppercase">Testimonial Management</h3>
        <p>Manage testimonials. View, approve or delete testimonials.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AllTestimonialStat />
        <PendingTestimonialStat />
      </div>

      <TestimonialTable />
    </div>
  );
}
