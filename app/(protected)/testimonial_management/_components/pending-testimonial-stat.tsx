import useTestimonial from "@/app/_hooks/testimonial.hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";

export default function PendingTestimonialStat() {
  const { count, isTestimonialsLoading } = useTestimonial("pending");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pending</CardTitle>
        <CardDescription>Number of pending testimonials</CardDescription>
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
