"use client";

import { useEffect, useState } from "react";
import VehicleCard from "@/components/General/VehicleCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_VEHICLES } from "@/sanity/lib/queries";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Search } from "lucide-react";

type VehicleItem = {
  _id: string;
  name?: string;
  type?: string;
  image?: unknown;
  engine?: string;
  horsepower?: string;
};

type Props = {
  search: string;
  selectedType?: string;
};

export default function VehicleGrid({ search, selectedType }: Props) {
  const [items, setItems] = useState<Array<VehicleItem>>([]);

  useEffect(() => {
    client.fetch<VehicleItem[]>(ALL_VEHICLES).then((res) => {
      setItems(res || []);
    });
  }, []);

  const mapped = items
    .map((v) => ({
      _id: v._id,
      name: v.name,
      type: v.type,
      image: v.image
        ? urlFor(v.image).width(800).auto("format").url()
        : undefined,
      engine: v.engine,
      horsepower: v.horsepower,
    }))
    .filter((v) => {
      if (selectedType && selectedType !== "") {
        if (v.type !== selectedType) return false;
      }
      if (search && search.trim() !== "") {
        return v.name?.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    });

  if (mapped.length === 0) {
    return (
      <Empty className="h-full">
        <Search className="h-12 w-12 text-muted-foreground" />
        <EmptyTitle>No vehicles found</EmptyTitle>
        <EmptyDescription>
          {search || selectedType
            ? "Try adjusting your search or filter criteria."
            : "No vehicles are currently available."}
        </EmptyDescription>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mapped.map((v) => (
        <VehicleCard
          key={v._id}
          id={v._id}
          name={v.name}
          image={v.image}
          engine={v.engine}
          horsepower={v.horsepower}
        />
      ))}
    </div>
  );
}
