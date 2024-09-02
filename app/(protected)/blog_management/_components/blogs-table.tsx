import useBlog from "@/app/_hooks/blog.hook";
import { Button } from "@/components/ui/button";
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
import { BlogCollectionFilter } from "@/lib/types";
import { cn, formatTime } from "@/lib/utils";
import { Edit2, Loader, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import DeleteBlogDialog from "./delete-blog-dialog";

function BlogsTable() {
  const [filter, setFilter] = useState<BlogCollectionFilter>("all");

  const {
    isBlogsLoading,
    blogs,
    count,
    currentPage,
    lastPage,
    handleNextPage,
    handlePrevPage,
  } = useBlog(filter);
  return (
    <Card className="w-full">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className="uppercase">
          {filter}
          {filter !== "drafts" && " Blogs"}
        </CardTitle>
        <Select
          value={filter}
          onValueChange={(v) => setFilter(v as BlogCollectionFilter)}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Choose filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="drafts">Drafts</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent
        className={cn(
          "min-h-20",
          isBlogsLoading && "flex items-center justify-center"
        )}
      >
        {isBlogsLoading && <Loader className="size-16 animate-spin" />}

        {!isBlogsLoading && blogs && blogs.length < 1 && (
          <div className="text-center flex flex-col items-center gap-9">
            <p>Nothing to see here</p>
            <Search className="size-14 animate-bounce" />
          </div>
        )}

        {blogs && blogs.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Title</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {blogs.map((blog, index) => (
                <TableRow key={blog.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{formatTime(blog.createdAt)}</TableCell>
                  <TableCell className="flex flex-col md:flex-row gap-4">
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full"
                    >
                      <Edit2 />
                    </Button>
                    <DeleteBlogDialog blog={blog} />
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

export default BlogsTable;
