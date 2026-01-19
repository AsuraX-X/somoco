"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { client } from "@/sanity/lib/client";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  selectedType?: string;
  setSelectedType: (v?: string) => void;
  contentType: string; // "vehicle" or "tyre"
  filterField: string; // "type" for vehicles, "brand" for tyres
  filterLabel: string; // "Type" for vehicles, "Brand" for tyres
  searchPlaceholder: string; // "Search vehicles..." or "Search tyres..."
};

export default function SidebarFilters({
  search,
  setSearch,
  selectedType,
  setSelectedType,
  contentType,
  filterField,
  filterLabel,
  searchPlaceholder,
}: Props) {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the filter field and dedupe on the client
    client
      .fetch<string[]>(`*[_type == "${contentType}"].${filterField}`)
      .then((res) => {
        const t = Array.from(new Set(res.filter(Boolean)));
        setTypes(t as string[]);
      });
  }, [contentType, filterField]);

  return (
    <aside className="space-y-6 w-full md:w-64 md:border-r md:pr-5 md:h-screen md:sticky top-10">
      <div>
        <Label className="mb-2">Search</Label>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">{filterLabel}</h3>
        <RadioGroup
          value={selectedType ?? ""}
          onValueChange={(val) => setSelectedType(val === "" ? undefined : val)}
        >
          <div className="flex flex-col space-y-2">
            <label className="flex items-center gap-2">
              <RadioGroupItem value="" />
              <span className="text-sm">All</span>
            </label>
            {types.map((t) => (
              <label key={t} className="flex items-center gap-2">
                <RadioGroupItem value={t} />
                <span className="text-sm">{t}</span>
              </label>
            ))}
          </div>
        </RadioGroup>
      </div>
    </aside>
  );
}
