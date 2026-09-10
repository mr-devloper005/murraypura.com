import { SbmDetailPage } from "@/components/sbm/sbm-detail-page";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { notFound } from "next/navigation";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("sbm", 50);
  if (!posts.length) {
    return [{ slug: "placeholder" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("sbm", resolvedParams.slug);
  return post ? await buildPostMetadata("sbm", post) : await buildTaskMetadata("sbm");
}

export default async function BookmarkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("sbm", resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  const related = (await fetchTaskPosts("sbm", 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      const content = item.content && typeof item.content === "object" ? item.content : {};
      const postContent = post.content && typeof post.content === "object" ? post.content : {};
      const itemCategory = (content as any).category || item.tags?.[0];
      const postCategory = (postContent as any).category || post.tags?.[0];
      if (!postCategory) return true;
      return itemCategory === postCategory;
    })
    .slice(0, 3);

  return <SbmDetailPage post={post} related={related} />;
}
