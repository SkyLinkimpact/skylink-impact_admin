import useTestimonial from "@/app/_hooks/testimonial.hook";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TestimonialCollectionFilter } from "@/lib/types";
import { cn, formatTime } from "@/lib/utils";
import { Edit2, Loader, Search } from "lucide-react";
import { useState } from "react";
import DeleteTestimonialDialog from "./delete-testimonial-dialog";
import ApproveTestimonialDialog from "./approve-testimonial-dialog";

export default function TestimonialTable() {
  const [filter, setFilter] = useState<TestimonialCollectionFilter>("all");

  const {
    count,
    currentPage,
    handleNextPage,
    handlePrevPage,
    isTestimonialsLoading,
    lastPage,
    testimonials,
  } = useTestimonial(filter);

  return (
    <Card className="w-full">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className="uppercase">{filter} Testimonials</CardTitle>
        <Select
          value={filter}
          onValueChange={(v) => setFilter(v as TestimonialCollectionFilter)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Choose filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent
        className={cn(
          "min-h-20",
          isTestimonialsLoading && "flex items-center justify-center"
        )}
      >
        {isTestimonialsLoading && <Loader className="size-16 animate-spin" />}

        {!isTestimonialsLoading && testimonials && testimonials.length < 1 && (
          <div className="text-center flex flex-col items-center gap-9">
            <p>Nothing to see here</p>
            <Search className="size-14 animate-bounce" />
          </div>
        )}

        {testimonials && testimonials.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Name</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Approved</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {testimonials.map((testimonial, idx) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="text-right">
                    {idx + 1 + (currentPage - 1) * 10}
                  </TableCell>
                  <TableCell>{testimonial.name}</TableCell>
                  <TableCell>{testimonial.comment}</TableCell>
                  <TableCell>{testimonial.approved ? "Yes" : "No"}</TableCell>
                  <TableCell>{formatTime(testimonial.createdAt)}</TableCell>
                  <TableCell className="flex flex-col md:flex-row gap-4">
                    {!testimonial.approved && (
                      <ApproveTestimonialDialog testimonial={testimonial} />
                    )}
                    <DeleteTestimonialDialog testimonial={testimonial} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {count && count > 15 && (
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  isActive={currentPage !== 1}
                  onClick={handlePrevPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  isActive={lastPage !== currentPage}
                  onClick={handleNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      )}
    </Card>
  );
}
