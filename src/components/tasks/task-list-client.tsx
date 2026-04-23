"use client";

import { useMemo } from "react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  if (!merged.length) {
    if (task === "sbm") {
      return (
        <div className="rounded-[2rem] border border-dashed border-[#e4d8cc] bg-[#fffefb] px-8 py-16 text-center shadow-[0_18px_50px_rgba(58,42,28,0.04)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a18b7a]">Your shelf is quiet</p>
          <p className="mt-3 text-lg font-semibold text-[#2a1f1a]">No bookmarks in this lane yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6b584c]">
            Try another category, submit a link from the header, or revisit when curators publish new collections.
          </p>
        </div>
      );
    }
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        No posts yet for this section.
      </div>
    );
  }

  return (
    <div
      className={
        task === "sbm"
          ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      }
    >
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
