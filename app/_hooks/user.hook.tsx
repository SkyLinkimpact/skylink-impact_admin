import { User } from "@/lib/types";
import { getUser } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to get the current user.
 *
 * @returns {{ user?: User, isUserLoading: boolean, userError: Error|null }}
 */
export default function useUser(): {
  user?: User;
  isUserLoading: boolean;
  userError: Error | null;
} {
  const { data, isLoading, error } = useQuery({
    /**
     * This is the query key that is used to identify the query.
     * It is also used as the key for the cache.
     */
    queryKey: ["user"],
    /**
     * This is the function that is called when the data is not available in the cache.
     * It is used to fetch the data from the server.
     */
    queryFn: getUser,
    /**
     * This is the interval at which the query should be refetched.
     * It is used to keep the cache up to date.
     */
    refetchInterval: 1000 * 60 * 30, // 30 minutes
  });
  return {
    /**
     * The current user.
     */
    user: data,
    /**
     * Whether the user is currently being fetched from the server.
     */
    isUserLoading: isLoading,
    /**
     * The error that occurred while fetching the user.
     */
    userError: error,
  };
}
