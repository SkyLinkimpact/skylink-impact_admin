"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AllEventsStat from "./_components/all-events-stat";
import PastEventsStat from "./_components/past-events-stat";
import UpcomingEventsStat from "./_components/upcoming-events-stat";
import EventsTable from "./_components/events-table";

export default function EventManagementPage() {
  return (
    <div className="space-y-6 w-full pt-4 px-4 lg:px-0">
      <div className="flex flex-col space-y-1.5 p-6 border-b">
        <h3 className="uppercase">Event Management</h3>
        <p>
          Manage your events. Create, edit, and delete events, as well as view
        </p>
      </div>

      <div className="flex">
        <div className="flex-1"></div>
        <Link
          className={cn(buttonVariants({ variant: "outline" }))}
          href="/event_management/new"
        >
          Create New &#43;
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AllEventsStat />
        <PastEventsStat />
        <UpcomingEventsStat />
      </div>

      <EventsTable />
    </div>
  );
}
