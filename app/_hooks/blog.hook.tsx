import { Blog, BlogCollectionFilter } from "@/lib/types";
import {
  getAllBlogs,
  getAllDraftBlogs,
  getAllPublishedBlogs,
} from "@/services/blog.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

/**
 * Hook to get the blogs based on a filter.
 *
 * @param {BlogCollectionFilter} [filter="all"] - The filter to apply to the blogs.
 * Can be "all", "published", or "drafts".
 * @return {{
 *   blogs?: Blog[],
 *   isBlogsLoading: boolean,
 *   blogsError: Error | null,
 *   currentPage: number,
 *   lastPage?: number,
 *   count?: number,
 *   handleNextPage: () => void,
 *   handlePrevPage: () => void,
 * }}
 */
export default function useBlog(filter: BlogCollectionFilter = "all"): {
  blogs?: Blog[];
  isBlogsLoading: boolean;
  blogsError: Error | null;
  currentPage: number;
  lastPage?: number;
  count?: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
} {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    /**
     * The query key is used to identify the query. It is also used as the key for the cache.
     */
    queryKey: ["blog", filter, currentPage],
    /**
     * The function that is used to fetch the data.
     */
    queryFn: () => {
      switch (filter) {
        case "all":
          /**
           * If the filter is "all", get all the blogs.
           */
          return getAllBlogs(currentPage);
        case "published":
          /**
           * If the filter is "published", get all the published blogs.
           */
          return getAllPublishedBlogs(currentPage);
        default:
          /**
           * If the filter is "drafts", get all the draft blogs.
           */
          return getAllDraftBlogs(currentPage);
      }
    },
  });

  /**
   * Function to go to the next page.
   */
  const handleNextPage = () => {
    if (data !== undefined) {
      setCurrentPage((prev) => {
        /**
         * If the current page is less than the last page, go to the next page.
         */
        const next = prev + 1;

        if (next <= data.meta.last_page) return next;

        return prev;
      });
    }
  };

  /**
   * Function to go to the previous page.
   */
  const handlePrevPage = () => {
    if (data !== undefined) {
      setCurrentPage((prev) => {
        /**
         * If the current page is greater than 1, go to the previous page.
         */
        const curr = prev - 1;
        if (curr > 0) return curr;

        return prev;
      });
    }
  };

  return {
    /**
     * The blogs.
     */
    blogs: data?.data,
    /**
     * Whether the blogs are loading.
     */
    isBlogsLoading: isLoading,
    /**
     * An error if there is one.
     */
    blogsError: error,
    /**
     * The current page.
     */
    currentPage,
    /**
     * The total number of blogs.
     */
    count: data?.meta.total,
    /**
     * The last page
     */
    lastPage: data?.meta.last_page,
    /**
     * Function to go to the next page.
     */
    handleNextPage,
    /**
     * Function to go to the previous page.
     */
    handlePrevPage,
  };
}
