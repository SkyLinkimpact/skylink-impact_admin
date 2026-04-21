import { z } from "zod";
import {
  createBlogFormSchema,
  createEventFormSchema,
  createTestimonialFormSchema,
  forgotPasswordFormSchema,
  loginFormSchema,
  resetPasswordFormSchema,
  updateBlogFormSchema,
} from "./schemas";

/**
 * A user login request.
 *
 * @remarks
 * This type is inferred from the {@link loginFormSchema} schema.
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
 * @remarks
 * This type is inferred from the {@link forgotPasswordFormSchema} schema.
 */
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordFormSchema>;

/**
 * A request to reset a user's password.
 *
 * @remarks
 * This type is inferred from the {@link resetPasswordFormSchema} schema.
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
  thumbnail: Omit<Media, "blogs" | "events"> | null;
};

/**
 * An event.
 *
 * Represents an event.
 */
export type Event = {
  /**
   * The ID of the event.
   */
  id: string;
  /**
   * The title of the event.
   */
  title: string;
  /**
   * The URL of the event.
   */
  url: string;
  /**
   * The thumbnail of the event.
   */
  thumbnail: Omit<Media, "blogs" | "events"> | null;
  /**
   * The date the event is happening.
   */
  eventAt: Date;
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
  /**
   * The events that the media item is associated with.
   */
  events: Pick<Event, "id" | "title">[];
};

/**
 * The possible filters for the blog collection.
 */
export type BlogCollectionFilter = "all" | "published" | "drafts";

/**
 * A request to create a new blog post.
 * @remarks
 * This type is inferred from the {@link createBlogFormSchema} schema.
 */
export type CreateBlogRequest = z.infer<typeof createBlogFormSchema>;

/**
 * A request to update an existing blog post.
 *
 * @remarks
 * This type is inferred from the {@link updateBlogFormSchema} schema.
 */
export type UpdateBlogRequest = z.infer<typeof updateBlogFormSchema>;

/**
 * A request to create a new event.
 *
 * @remarks
 * This type is inferred from the {@link createEventFormSchema} schema.
 */
export type CreateEventRequest = z.infer<typeof createEventFormSchema>;

/**
 * A testimonial.
 *
 * Represents a testimonial.
 */
export type Testimonial = {
  /**
   * The id of the testimonial.
   */
  id: string;
  /**
   * The name of the person who gave the testimonial.
   */
  name: string;
  /**
   * The comment given by the person who gave the testimonial.
   */
  comment: string;
  /**
   * Whether the testimonial is approved.
   */
  approved: boolean;
  /**
   * The date when the testimonial was created.
   */
  createdAt: Date;
};

/**
 * The possible filters for the testimonial collection.
 */
export type TestimonialCollectionFilter = "all" | "pending";

/**
 * A request to create a new testimonial.
 *
 * @remarks
 * This type is inferred from the {@link createTestimonialFormSchema} schema.
 */
export type CreateTestimonialRequest = z.infer<
  typeof createTestimonialFormSchema
>;
