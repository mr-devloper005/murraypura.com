"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { getTaskConfig } from "@/lib/site-config";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { SITE_CONFIG } from "@/lib/site-config";
import { useAuth } from "@/lib/auth-context";
import { ThumbsUp, MessageCircle, Bookmark, Play, Share2, ExternalLink, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface SbmDetailPageProps {
  post: SitePost;
  related: SitePost[];
}

type PostContent = {
  category?: string;
  url?: string;
  website?: string;
  description?: string;
  body?: string;
  author?: string;
};

const getContent = (post: SitePost): PostContent => {
  const content = post.content && typeof post.content === "object" ? post.content : {};
  return content as PostContent;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-amber-600",
    "bg-blue-600",
    "bg-emerald-600",
    "bg-rose-600",
    "bg-violet-600",
    "bg-cyan-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const extractUrlFromContent = (content: PostContent): string | null => {
  if (typeof content.url === "string" && content.url.trim()) {
    return content.url.trim();
  }
  if (typeof content.website === "string" && content.website.trim()) {
    return content.website.trim();
  }
  return null;
};

const extractLinksFromText = (text: string): { text: string; url: string | null } => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex);
  if (matches && matches.length > 0) {
    return { text: text.replace(urlRegex, "").trim(), url: matches[0] };
  }
  return { text, url: null };
};

const stripHtml = (html: string): string => {
  if (!html || typeof html !== "string") return "";
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
};

const ANCHOR_PLACEHOLDER = "\u0000ANCHOR\u0000";

const sanitizeHtmlWithLinks = (html: string): string => {
  if (!html || typeof html !== "string") return "";

  // Remove script and style tags first
  let cleaned = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  // Remove event handlers and javascript: hrefs globally
  cleaned = cleaned
    .replace(/\s+on[a-z]+\s*=\s*(["']).*?\1/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*[^>\s]*/gi, "")
    .replace(/\shref\s*=\s*(["'])javascript:.*?\1/gi, ' href="#"');

  const anchors: string[] = [];

  // Capture and sanitize <a> tags
  cleaned = cleaned.replace(/<a\s+([^>]*)>([\s\S]*?)<\/a>/gi, (match, attrs, text) => {
    const hrefMatch = attrs.match(/href\s*=\s*(["'])(.*?)\1/i);
    const href = hrefMatch ? hrefMatch[2] : "";

    // Only allow safe hrefs
    const isSafe = !href || /^https?:\/\//i.test(href) || /^\//i.test(href) || /^mailto:/i.test(href);
    if (!isSafe) {
      // Strip the anchor but keep the inner text
      return text;
    }

    const safeHref = href.replace(/"/g, "&quot;");
    const safeText = sanitizeHtmlWithLinks(text); // recursively strip nested tags
    const anchorTag = `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4 text-red-600 hover:text-red-500">${safeText}</a>`;
    const idx = anchors.length;
    anchors.push(anchorTag);
    return `${ANCHOR_PLACEHOLDER}${idx}`;
  });

  // Strip all remaining HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, " ");

  // Restore anchors
  anchors.forEach((tag, idx) => {
    cleaned = cleaned.replace(`${ANCHOR_PLACEHOLDER}${idx}`, tag);
  });

  // Clean whitespace
  return cleaned.replace(/\s+/g, " ").trim();
};

const parseHtmlToParagraphsWithLinks = (html: string): string[] => {
  if (!html || typeof html !== "string") return [];

  // Remove script and style tags
  const sanitized = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  // Split by common paragraph delimiters
  const paragraphs = sanitized
    .split(/<\/?p[^>]*>|<br\s*\/?>|\n\n+/gi)
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && !p.match(/^\s*$/));

  // If no paragraph tags found, treat the whole content as one paragraph
  if (paragraphs.length === 0 && sanitized.trim()) {
    return [sanitizeHtmlWithLinks(sanitized.trim())].filter((p) => p.length > 0);
  }

  return paragraphs
    .map((p) => sanitizeHtmlWithLinks(p))
    .filter((p) => p.length > 0);
};

function ActionButton({
  icon: Icon,
  label,
  active,
  onClick,
  count,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 rounded-full px-3 py-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
      aria-label={label}
    >
      <Icon className={`h-5 w-5 ${active ? "fill-current text-neutral-800" : ""}`} />
      {count !== undefined && count > 0 && (
        <span className="text-sm font-medium">{count}</span>
      )}
    </button>
  );
}

export function SbmDetailPage({ post, related }: SbmDetailPageProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [companyPushed, setCompanyPushed] = useState(false);
  const [copied, setCopied] = useState(false);

  const content = getContent(post);
  const taskConfig = getTaskConfig("sbm");
  const authorName = content.author || post.authorName || "Anonymous";
  const category = content.category || post.tags?.[0] || "Bookmark";
  
  const rawDescription = content.description || content.body || post.summary || "";
  const isHtml = /<[a-z][\s\S]*>/i.test(rawDescription);
  const paragraphs = isHtml ? parseHtmlToParagraphsWithLinks(rawDescription) : [rawDescription];
  const plainTextForLinks = stripHtml(rawDescription);
  const { url: extractedUrl } = extractLinksFromText(plainTextForLinks);
  const sourceUrl = extractUrlFromContent(content) || extractedUrl;

  const handleLike = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setLiked(!liked);
    setLikeCount(liked ? Math.max(0, likeCount - 1) : likeCount + 1);
  };

  const handleComment = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    // Comment functionality would open comment section
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setBookmarked(!bookmarked);
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : `${SITE_CONFIG.baseUrl}/sbm/${post.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard fails
    }
  };

  const articleUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}/sbm/${post.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.baseUrl.replace(/\/$/, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: taskConfig?.label || "Bookmarks",
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}/sbm`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <NavbarShell />
      <SchemaJsonLd data={breadcrumbSchema} />
      
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/sbm"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bookmarks
        </Link>

        {/* Article Header */}
        <article className="space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
            {post.title}
          </h1>

          {/* Author & Meta */}
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${getAvatarColor(
                authorName
              )}`}
            >
              {getInitials(authorName)}
            </div>
            <div className="flex flex-col">
              <button
                onClick={() => setCompanyPushed(!companyPushed)}
                className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                  companyPushed
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {authorName}
              </button>
              {category && (
                <span className="mt-1 text-sm text-neutral-500">
                  <span className="capitalize">{category}</span>
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-200" />

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-p:text-neutral-700 prose-a:text-red-600 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-red-500">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))
            ) : (
              <p className="italic text-neutral-400">No description available.</p>
            )}

            {/* Source Link */}
            {sourceUrl && (
              <p className="mt-6">
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600"
                >
                  {sourceUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              </p>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="border-t border-neutral-200 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <ActionButton
                  icon={ThumbsUp}
                  label="Like"
                  active={liked}
                  onClick={handleLike}
                  count={likeCount > 0 ? likeCount : undefined}
                />
                <ActionButton icon={MessageCircle} label="Comment" onClick={handleComment} />
              </div>
              <div className="flex items-center gap-1">
                <ActionButton
                  icon={Bookmark}
                  label="Bookmark"
                  active={bookmarked}
                  onClick={handleBookmark}
                />
                <div className="relative">
                  <ActionButton
                    icon={Share2}
                    label="Share"
                    onClick={handleShare}
                  />
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs font-medium text-white shadow-lg">
                      URL copied!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Bookmarks */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-neutral-900">More bookmarks</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <TaskPostCard
                  key={item.id}
                  post={item}
                  href={buildPostUrl("sbm" as TaskKey, item.slug)}
                  taskKey="sbm"
                />
              ))}
            </div>
          </section>
        )}

        {/* Browse More */}
        <div className="mt-12 text-center">
          <Link
            href="/sbm"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            Browse all bookmarks
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
