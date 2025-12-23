import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";

type BlogCardProps = {
  image?: string | null;
  title?: string | null;
  excerpt?: string | null;
  id?: string | null;
  publishedAt?: string | null;
};

export const BlogCard: FC<BlogCardProps> = ({
  image,
  title,
  excerpt,
  id,
  publishedAt,
}) => {
  const alt = title || "Blog image";
  const src = image || "/placeholder-article.png";

  const formattedDate = (() => {
    if (!publishedAt) return null;
    try {
      const d = new Date(publishedAt);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return null;
    }
  })();

  return (
    <Link href={id ? `/blogs/${id}` : `#`} className="h-100">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <Image
            src={src}
            alt={alt}
            width={320}
            height={200}
            unoptimized
            className="w-full h-full rounded-t-sm aspect-video object-cover"
          />
        </div>
        <div className="flex-1 py-5 px-4 rounded-b-sm border justify-between flex flex-col">
          <div>
            <h1 className="text-[22px] line-clamp-2">{title}</h1>
            <p className=" line-clamp-3 text-sm text-black/60">{excerpt}</p>
          </div>
          {formattedDate && (
            <p className="text-xs place-self-end">
              <span className="bg-muted p-2 py-1 rounded-full">
                {formattedDate}
              </span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
