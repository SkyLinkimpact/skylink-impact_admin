import React, { ReactNode } from "react";
import { EventProvider } from "./_components/event-context";

export default function EventLayout({
  children,
  params: { id },
}: Readonly<{ children: ReactNode; params: { id: string } }>) {
  return <EventProvider id={id}>{children}</EventProvider>;
}
