import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date object into a string that is easy to read.
 *
 * @param {Date} period - The date object to format.
 * @returns {string} A string representation of the date.
 */
export function formatTime(period: Date): string {
  const date = new Date(period);

  // Format the date string like this:
  // 20/10/2022, 10:00 AM
  const dateString = date.toLocaleString(undefined, {
    day: "2-digit",
    year: "numeric",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return dateString;
}
