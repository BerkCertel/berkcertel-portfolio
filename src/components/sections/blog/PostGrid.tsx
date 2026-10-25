import { Reveal } from "@/components/common/Reveal";
import type { PostMeta } from "@/types/blog";

import { PostCard } from "./PostCard";

/** 3-column grid of post cards (2 ≤1080px, 1 ≤760px) that rise in one after another. */
export function PostGrid({ posts }: { posts: PostMeta[] }) {
  return (
    <Reveal className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1">
      {posts.map((post, i) => (
        <PostCard
          key={post.slug}
          post={post}
          className="reveal"
          // Stagger like the design (80ms between cards).
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}
    </Reveal>
  );
}
