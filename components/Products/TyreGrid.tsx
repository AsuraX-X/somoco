"use client";

import React, { useEffect, useState } from "react";
import TyreCard from "@/components/General/TyreCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_TYRES } from "@/sanity/lib/queries";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Search } from "lucide-react";

type TyreItem = {
  _id: string;
  name?: string;
  brand?: string;
  image?: unknown;
  sizes?: string[];
};

type Props = {
  search: string;
  selectedType?: string;
};

export default function TyreGrid({ search, selectedType }: Props) {
  const [items, setItems] = useState<Array<TyreItem>>([]);

  useEffect(() => {
    // Use the ALL_TYRES query for consistency
    client.fetch<TyreItem[]>(ALL_TYRES).then((res) => {
      setItems(res || []);
    });
  }, []);

  const mapped = items
    .map((t) => ({
      _id: t._id,
      name: t.name,
      brand: t.brand,
      image: t.image
        ? urlFor(t.image).width(800).auto("format").url()
        : undefined,
      sizes: t.sizes,
    }))
    .filter((t) => {
      if (selectedType && selectedType !== "") {
        if (t.brand !== selectedType) return false;
      }
      if (search && search.trim() !== "") {
        return (
          t.name?.toLowerCase().includes(search.toLowerCase()) ||
          t.brand?.toLowerCase().includes(search.toLowerCase())
        );
      }
      return true;
    });

  if (mapped.length === 0) {
    return (
      <Empty className="h-full">
        <Search className="h-12 w-12 text-muted-foreground" />
        <EmptyTitle>No tyres found</EmptyTitle>
        <EmptyDescription>
          {search || selectedType
            ? "Try adjusting your search or filter criteria."
            : "No tyres are currently available."}
        </EmptyDescription>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mapped.map((t) => (
        <TyreCard
          key={t._id}
          id={t._id}
          name={t.name}
          brand={t.brand ?? ""}
          image={t.image}
          sizes={t.sizes}
        />
      ))}
    </div>
  );
}
