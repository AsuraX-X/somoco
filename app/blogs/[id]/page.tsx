import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import type { Blog } from "@/sanity.types";

const SITE_URL = "https://www.somocoghana.com";

type Props = { params: Promise<{ id: string }> };

const blogQuery = `*[_type == "blog" && _id == $id][0]{_id, title, excerpt, body, mainImage, publishedAt}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  if (!id) return { title: "Blog" };

  const blog = await client.fetch<Blog | null>(blogQuery, { id });

  if (!blog) return { title: "Blog Not Found" };

  const ogImageUrl = blog.mainImage
    ? urlFor(blog.mainImage).width(1200).height(630).url()
    : undefined;

  const canonicalUrl = `${SITE_URL}/blogs/${id}`;

  return {
    title: blog.title ?? "Blog",
    description: blog.excerpt ?? `Read this article on the Somoco Ghana blog.`,
    openGraph: {
      title: blog.title ?? "Blog | Somoco Ghana Limited",
      description:
        blog.excerpt ?? "Read this article on the Somoco Ghana blog.",
      url: canonicalUrl,
      type: "article",
      publishedTime: blog.publishedAt ?? undefined,
      authors: ["Somoco Ghana Limited"],
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: blog.title ?? "Blog post",
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title ?? "Blog | Somoco Ghana Limited",
      description:
        blog.excerpt ?? "Read this article on the Somoco Ghana blog.",
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogByIdPage({ params }: Props) {
  // defensively await params like other pages
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return <div className="py-24 text-center">Blog not found</div>;
  }

  const blog = await client.fetch<Blog | null>(blogQuery, { id });

  if (!blog) {
    return <div className="py-24 text-center">Blog not found</div>;
  }

  const md = new MarkdownIt({ html: true });
  const html = md.render(blog.body || "");

  const publishedAt = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : undefined;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {blog.mainImage && (
        <div className="mb-6">
          <Image
            src={urlFor(blog.mainImage).width(1600).url() || ""}
            alt={blog.mainImage.alt || blog.title || "Blog image"}
            width={1600}
            height={900}
            unoptimized
            className="w-full rounded-md object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl font-semibold mb-2">{blog.title}</h1>
      {publishedAt && (
        <div className="text-sm text-muted-foreground mb-6">{publishedAt}</div>
      )}

      {blog.excerpt && (
        <p className="text-lg text-muted-foreground mb-6">{blog.excerpt}</p>
      )}

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
