import useTestimonial from "@/app/_hooks/testimonial.hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";

/**
 * The component to display the number of all testimonials.
 *
 * @remarks
 * - Fetches the list of all testimonials from the server.
 * - Displays the number of all testimonials.
 * - Displays a loader if the testimonials are not loaded yet.
 */
export default function AllTestimonialStat(): JSX.Element {
  const { count, isTestimonialsLoading } = useTestimonial();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>All</CardTitle>
        <CardDescription>Number of testimonials</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Loader */}
        {isTestimonialsLoading && (
          <div className="flex justify-center w-full">
            <Loader className="animate-spin" />
          </div>
        )}
        {/* Stat */}
        <p className="text-2xl font-bold">{count}</p>
      </CardContent>
    </Card>
  );
}
