import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/reactQuery";
import { postsQueryOptions } from "@/lib/features/posts";
import { PostList } from "@/components/posts/post-list";

export default function PostsPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(postsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList />
    </HydrationBoundary>
  );
}
