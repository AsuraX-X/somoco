"use client";

import React, { useEffect, useState } from "react";
import BatteryCard from "@/components/General/BatteryCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_BATTERIES } from "@/sanity/lib/queries";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Search } from "lucide-react";

type BatteryItem = {
  _id: string;
  name?: string;
  brand?: string;
  image?: unknown;
};

type Props = {
  search: string;
  selectedType?: string;
};

export default function BatteryGrid({ search, selectedType }: Props) {
  const [items, setItems] = useState<Array<BatteryItem>>([]);

  useEffect(() => {
    client.fetch<BatteryItem[]>(ALL_BATTERIES).then((res) => {
      setItems(res || []);
    });
  }, []);

  const mapped = items
    .map((b) => ({
      _id: b._id,
      name: b.name,
      brand: b.brand,
      image: b.image
        ? urlFor(b.image).width(800).auto("format").url()
        : undefined,
    }))
    .filter((b) => {
      if (selectedType && selectedType !== "") {
        if (b.brand !== selectedType) return false;
      }
      if (search && search.trim() !== "") {
        return (
          b.name?.toLowerCase().includes(search.toLowerCase()) ||
          b.brand?.toLowerCase().includes(search.toLowerCase())
        );
      }
      return true;
    });

  if (mapped.length === 0) {
    return (
      <Empty className="h-full">
        <Search className="h-12 w-12 text-muted-foreground" />
        <EmptyTitle>No batteries found</EmptyTitle>
        <EmptyDescription>
          {search
            ? "Try adjusting your search terms"
            : "No batteries available at this time"}
        </EmptyDescription>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {mapped.map((battery) => (
        <BatteryCard
          key={battery._id}
          id={battery._id}
          name={battery.name || battery.brand || "Unnamed Battery"}
          brand={battery.brand}
          image={battery.image}
        />
      ))}
    </div>
  );
}
