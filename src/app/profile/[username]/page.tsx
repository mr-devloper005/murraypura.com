import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl, getPostImages } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { Globe, MapPin, Mail, ShieldCheck, ArrowUpRight, Tag, ExternalLink } from "lucide-react";
import { ShareButton } from "@/components/shared/share-button";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

// Parse HTML description to extract main content (removes appended promotional content)
const parseDescription = (html: string): { mainContent: string; hasExtraContent: boolean } => {
  let cleanHtml = html;
  
  // Remove "New Page" paragraph if present
  cleanHtml = cleanHtml.replace(/<p>\s*New Page\s*<\/p>/gi, '');
  
  // Check if description contains Rmapproach link or similar appended content
  const rmapproachIndex = cleanHtml.toLowerCase().indexOf('rmapproach.com');
  
  if (rmapproachIndex > -1) {
    // Extract content before the appended link
    const mainContent = cleanHtml.substring(0, rmapproachIndex).trim();
    // Remove trailing paragraph tags or newlines
    const cleanMain = mainContent
      .replace(/<p>\s*<\/p>\s*$/, '')
      .replace(/\n\s*$/, '')
      .trim();
    return { mainContent: cleanMain, hasExtraContent: true };
  }
  
  // Clean up any empty paragraphs
  const cleanMain = cleanHtml
    .replace(/<p>\s*<\/p>\s*/g, '')
    .trim();
  
  return { mainContent: cleanMain, hasExtraContent: false };
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const rawDescription =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  
  // Parse description to extract clean content
  const { mainContent: cleanDescription } = parseDescription(rawDescription);
  const descriptionHtml = formatRichHtml(cleanDescription);
  
  // Additional content for About section
  const additionalContent = `<p><a href="https://Rmapproach.com" target="_blank" rel="noopener noreferrer"><b>Emotional Intelligence Training in Mumbai</b></a></p>`;
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  const images = getPostImages(post);
  const location = typeof content.location === 'string' ? content.location : typeof content.address === 'string' ? content.address : '';
  const email = typeof content.email === 'string' ? content.email : '';
  const isVerified = content.isVerified === true || content.verified === true || content.pro === true;

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        
        {/* Hero Header Section - Matching Reference Design */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          <div className="relative px-6 py-10 md:px-10 md:py-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
              {/* Logo/Avatar */}
              <div className="flex-shrink-0">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white/20 bg-white shadow-xl md:h-32 md:w-32">
                  {logoUrl ? (
                    <ContentImage 
                      src={logoUrl} 
                      alt={post.title} 
                      fill 
                      className="object-cover" 
                      sizes="128px" 
                      intrinsicWidth={128} 
                      intrinsicHeight={128} 
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-4xl font-bold text-slate-600">
                      {brandName.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{brandName}</h1>
                      {isVerified && (
                        <Badge className="bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider shadow-lg">
                          PRO
                        </Badge>
                      )}
                    </div>
                    {domain && (
                      <p className="mt-1.5 text-sm text-slate-300 flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5" />
                        {domain}
                      </p>
                    )}
                  </div>
                  
                  {/* Share Button */}
                  <ShareButton title={brandName} description={cleanDescription.slice(0, 100)} />
                </div>
                
                {/* Quick Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {website && (
                    <Button 
                      asChild
                      size="sm" 
                      className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg"
                    >
                      <Link href={website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <Tabs defaultValue="info" className="mt-8">
          <TabsList className="w-full justify-start rounded-2xl bg-white border border-border p-1.5 shadow-sm md:w-auto">
            <TabsTrigger value="info" className="rounded-xl px-6 py-2.5 text-sm font-medium data-[state=active]:bg-slate-900 data-[state=active]:text-white">
              Info
            </TabsTrigger>
            <TabsTrigger value="galleries" className="rounded-xl px-6 py-2.5 text-sm font-medium data-[state=active]:bg-slate-900 data-[state=active]:text-white">
              Galleries
            </TabsTrigger>
            <TabsTrigger value="latest" className="rounded-xl px-6 py-2.5 text-sm font-medium data-[state=active]:bg-slate-900 data-[state=active]:text-white">
              Latest
            </TabsTrigger>
          </TabsList>
          
          {/* Info Tab */}
          <TabsContent value="info" className="mt-6 space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              {/* Main Content */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-foreground">About</h2>
                  <article
                    className="article-content prose prose-slate mt-4 max-w-none text-sm leading-7 text-muted-foreground prose-p:my-3 prose-a:text-primary prose-a:underline prose-strong:font-semibold"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                  <div 
                    className="article-content prose prose-slate mt-4 pt-4 border-t border-border text-sm prose-a:text-primary prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: additionalContent }}
                  />
                </div>
                
                {/* Contact Info Cards */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {location && (
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 shadow-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">Location</p>
                        <p className="text-sm font-medium text-foreground truncate">{location}</p>
                      </div>
                    </div>
                  )}
                  {email && (
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 shadow-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">Email</p>
                        <p className="text-sm font-medium text-foreground truncate">{email}</p>
                      </div>
                    </div>
                  )}
                  {website && (
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 shadow-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">Website</p>
                        <Link 
                          href={website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary hover:underline truncate block"
                        >
                          {domain}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Verified Badge Card */}
                <div className="rounded-2xl border border-border bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                      <ShieldCheck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Verified Profile</p>
                      <p className="text-xs text-muted-foreground">This profile has been verified</p>
                    </div>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick Info</p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Profile Type</span>
                      <Badge variant="secondary">Business</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant="default" className="bg-emerald-500">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Galleries Tab */}
          <TabsContent value="galleries" className="mt-6">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">Photo Gallery</h2>
              {images.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
                    >
                      <ContentImage 
                        src={image} 
                        alt={`${brandName} - Image ${index + 1}`}
                        fill 
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 py-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Tag className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">No images available</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Latest Tab */}
          <TabsContent value="latest" className="mt-6">
            {suggestedArticles.length ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Latest Updates</h2>
                  <Link 
                    href="/articles" 
                    className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View all
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {suggestedArticles.slice(0, 6).map((article) => (
                    <TaskPostCard
                      key={article.id}
                      post={article}
                      href={buildPostUrl("article", article.slug)}
                      compact
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
                <p className="text-muted-foreground">No latest updates available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Related Links Section */}
        {suggestedArticles.length > 0 && (
          <nav className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-foreground">Related links</p>
            <ul className="mt-3 space-y-2">
              {suggestedArticles.slice(0, 3).map((article) => (
                <li key={`related-${article.id}`}>
                  <Link
                    href={buildPostUrl("article", article.slug)}
                    className="text-sm text-primary underline-offset-4 hover:underline inline-flex items-center gap-1"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/profile" 
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline inline-flex items-center gap-1"
                >
                  Browse all profiles
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </main>
      <Footer />
    </div>
  );
}
