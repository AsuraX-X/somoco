import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import type { Blog } from "@/sanity.types";

type Props = { params: { id: string } };

export default async function BlogByIdPage({ params }: Props) {
  // defensively await params like other pages
  const { id } = (await params) as { id?: string };

  if (!id || typeof id !== "string") {
    return <div className="py-24 text-center">Blog not found</div>;
  }

  const query = `*[_type == "blog" && _id == $id][0]{_id, title, excerpt, body, mainImage, publishedAt}`;
  const blog = await client.fetch<Blog | null>(query, { id });

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
