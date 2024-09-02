import useBlog from "@/app/_hooks/blog.hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import React from "react";

export default function PublishedBlogStat() {
  const { count, isBlogsLoading } = useBlog("published");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Published</CardTitle>
        <CardDescription>Number of published blog posts</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Loader */}
        {isBlogsLoading && (
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
