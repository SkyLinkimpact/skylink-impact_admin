"use client";

import Link from "next/link";
import AllBlogStat from "./_components/all-blog-stat";
import BlogsTable from "./_components/blogs-table";
import DraftBlogStat from "./_components/draft-blog-stat";
import PublishedBlogStat from "./_components/published-blog-stat";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function BlogManagementPage() {
  return (
    <div className="space-y-6 w-full pt-4 px-4 lg:px-0">
      <div className="flex flex-col space-y-1.5 p-6 border-b">
        <h3 className="uppercase">Blog Management</h3>
        <p>
          Manage your blog posts. Create, edit, and delete posts, as well as
          view post drafts.
        </p>
      </div>

      <div className="flex">
        <div className="flex-1"></div>
        <Link
          className={cn(buttonVariants({ variant: "outline" }))}
          href="/blog_management/new"
        >
          Create New &#43;
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AllBlogStat />
        <PublishedBlogStat />
        <DraftBlogStat />
      </div>

      <BlogsTable />
    </div>
  );
}
