import React from "react";
import { ItemGroup } from "@/components/ui/item";
import { BlogCard } from "@/components/Blog/BlogCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Blog } from "@/sanity.types";
import Image from "next/image";

const query = `*[_type == "blog"] | order(_createdAt desc){_id, title, excerpt, mainImage, _createdAt}`;

export default async function Blogs() {
  const blogs = (await client.fetch<Blog[]>(query)) || [];

  return (
    <div className="">
      <div className="w-full max-h-[430px] relative h-full">
        <Image
          src={"/blogs-banner.png"}
          alt="blog banner"
          width={430}
          height={0}
          unoptimized
          className="h-full w-full"
        />
        <h1 className="absolute bottom-2 sm:bottom-5 px-4 sm:px-20 text-white font-extrabold text-2xl sm:text-4xl shadow-2xl uppercase text-shadow-2xs text-shadow-accent-foreground/30">
          Blogs
        </h1>
      </div>
      <h1 className="text-4xl font-extrabold text-center mt-10">
        Latest Blogs
      </h1>
      <ItemGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8 px-4 sm:px-20">
        {blogs.map((b) => (
          <BlogCard
            key={b._id}
            image={
              b.mainImage ? urlFor(b.mainImage).width(1200).url() : undefined
            }
            title={b.title}
            excerpt={b.excerpt}
            id={b._id}
            createdAt={b._createdAt}
          />
        ))}
      </ItemGroup>
    </div>
  );
}
