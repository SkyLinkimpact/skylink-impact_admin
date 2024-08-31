import { z } from "zod";
import {
  forgotPasswordFormSchema,
  loginFormSchema,
  resetPasswordFormSchema,
} from "./schemas";

/**
 * A user login request.
 */
export type UserLoginRequest = z.infer<typeof loginFormSchema>;

/**
 * A user.
 *
 * @remarks
 * Represents a user in the system.
 */
export type User = {
  /**
   * The user's ID.
   */
  id: string;
  /**
   * The user's name.
   */
  name: string;
  /**
   * The user's email address.
   */
  email: string;
  /**
   * The user's creation date.
   */
  createdAt: Date;
};

/**
 * An error response from the server.
 *
 * @remarks
 * Represents an error response from the server. The response
 * contains a `data` object which contains a `message` and
 * optionally an `errors` object which contains error messages
 * for each field.
 */
export type ServerErrorResponse = {
  response: {
    data: {
      message: string;
      errors?: Record<string, string[]>;
    };
  };
};

/**
 * A request to reset a user's password.
 *
 */
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordFormSchema>;

/**
 * A request to reset a user's password.
 *
 */
export type ResetPasswordRequest = z.infer<typeof resetPasswordFormSchema>;

/**
 * A response from the server containing a collection of items.
 */
export type PaginatedResponse<T> = {
  /**
   * The items in the collection.
   */
  data: T[];
  /**
   * Metadata about the collection.
   */
  meta: {
    /**
     * The total number of items in the collection.
     */
    total: number;
    /**
     * The current page number.
     */
    current_page: number;
    /**
     * The last page number.
     */
    last_page: number;
    /**
     * The number of items per page.
     */
    per_page: number;
  };
};

/**
 * A blog post.
 *
 * @remarks
 * Represents a blog post.
 */
export type Blog = {
  /**
   * The ID of the blog post.
   */
  id: string;
  /**
   * The title of the blog post.
   */
  title: string;
  /**
   * The slug of the blog post.
   */
  slug: string;
  /**
   * The content of the blog post.
   */
  content: string;
  /**
   * The date the blog post was published.
   */
  publishedAt: Date | null;
  /**
   * The date the blog post was created.
   */
  createdAt: Date;
  /**
   * The date the blog post was last updated.
   */
  updatedAt: Date;
  /**
   * The date the blog post was deleted.
   */
  deletedAt: Date | null;
  /**
   * The thumbnail of the blog post.
   */
  thumbnail: Omit<Media, "blogs"> | null;
};

/**
 * Media entity.
 *
 * Represents a media item.
 */
export type Media = {
  /**
   * The ID of the media item.
   */
  id: string;
  /**
   * The URL of the media item.
   */
  url: string;
  /**
   * The type of the media item.
   */
  type: string;
  /**
   * The extension of the media item.
   */
  extension: string;
  /**
   * The file size of the media item.
   */
  fileSize: string;
  /**
   * The directory of the media item.
   */
  directory: string;
  /**
   * The disk of the media item.
   */
  disk: string;
  /**
   * The blogs that the media item is associated with.
   */
  blogs: Pick<Blog, "id" | "title">[];
  // TODO: event collection type
};

/**
 * The possible filters for the blog collection.
 */
export type BlogCollectionFilter = "all" | "published" | "drafts";
