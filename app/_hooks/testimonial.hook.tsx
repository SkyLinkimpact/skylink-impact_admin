import { TestimonialCollectionFilter } from "@/lib/types";
import {
  getAllTestimonials,
  getPendingTestimonials,
} from "@/services/testimonial.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

/**
 * Hook to get the testimonials based on a filter.
 *
 * @param {TestimonialCollectionFilter} [filter="all"] - The filter to apply to the testimonials.
 * Can be "all", or "pending".
 * @return {{
 *   testimonials: Testimonial[],
 *   isTestimonialsLoading: boolean,
 *   testimonialsError: Error | null,
 *   currentPage: number,
 *   lastPage?: number,
 *   count?: number,
 *   handleNextPage: () => void,
 *   handlePrevPage: () => void,
 * }}
 */
export default function useTestimonial(
  filter: TestimonialCollectionFilter = "all"
) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    /**
     * The query key is used to identify the query.
     * It is also used as the key for the cache.
     */
    queryKey: ["testimonials", filter, currentPage],
    /**
     * The function that is used to fetch the data.
     */
    queryFn: () => {
      switch (filter) {
        case "pending":
          /**
           * If the filter is "pending", get all the pending testimonials.
           */
          return getPendingTestimonials(currentPage);
        default:
          /**
           * If the filter is "all", get all the testimonials.
           */
          return getAllTestimonials(currentPage);
      }
    },
  });

  /**
   * Function to go to the next page.
   *
   * If the current page is less than the last page, go to the next page.
   */
  const handleNextPage = () => {
    if (data !== undefined) {
      setCurrentPage((prev) => {
        const next = prev + 1;

        if (next <= data.meta.last_page) return next;

        return prev;
      });
    }
  };

  /**
   * Function to go to the previous page.
   *
   * If the current page is greater than 1, go to the previous page.
   */
  const handlePrevPage = () => {
    if (data !== undefined) {
      setCurrentPage((prev) => {
        const curr = prev - 1;
        if (curr > 0) return curr;

        return prev;
      });
    }
  };

  return {
    testimonials: data?.data,
    isTestimonialsLoading: isLoading,
    testimonialsError: error,
    currentPage,
    lastPage: data?.meta.last_page,
    count: data?.meta.total,
    handleNextPage,
    handlePrevPage,
  };
}
