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
  createdAt?: string | null;
};

export const BlogCard: FC<BlogCardProps> = ({
  image,
  title,
  excerpt,
  id,
  createdAt,
}) => {
  const alt = title || "Blog image";
  const src = image || "/placeholder-article.png";

  const formattedDate = (() => {
    if (!createdAt) return null;
    try {
      const d = new Date(createdAt);
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
    <Link href={id ? `/blogs/${id}` : `#`} className="block">
      <Item variant="outline" className="relative overflow-hidden">
        <ItemHeader>
          <Image
            src={src}
            alt={alt}
            width={320}
            height={200}
            unoptimized
            className="w-full rounded-sm object-cover"
          />
        </ItemHeader>
        <ItemContent>
          <ItemTitle className="text-2xl">{title}</ItemTitle>
          <ItemDescription>{excerpt}</ItemDescription>

          {formattedDate && (
            <ItemDescription className="text-xs  flex items-center justify-end">
              <span className="bg-muted p-2 py-1 rounded-full">
                {formattedDate}
              </span>
            </ItemDescription>
          )}
        </ItemContent>
      </Item>
    </Link>
  );
};

export default BlogCard;
