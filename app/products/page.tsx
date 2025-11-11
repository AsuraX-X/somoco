"use client";
import React, { Suspense, useEffect, useState } from "react";
import SidebarFilters from "@/components/Products/SidebarFilters";
import ProductGrid from "@/components/Products/ProductGrid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize from URL params
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [selectedType, setSelectedType] = useState<string | undefined>(
    () => searchParams.get("type") ?? undefined
  );

  // When params change externally (back/forward), keep local state in sync
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const type = searchParams.get("type") ?? undefined;
    setSearch(q);
    setSelectedType(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  // Push state to URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search && search.trim() !== "") params.set("q", search);
    if (selectedType && selectedType !== "") params.set("type", selectedType);

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    // replace so we don't create history entries on each change
    router.replace(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedType]);

  return (
    <div className=" min-h-screen">
      <div className="w-full max-h-[430px] relative h-full">
        <Image
          src={"/products-banner.jpg"}
          alt="about us banner"
          width={430}
          height={0}
          unoptimized
          className="h-full w-full"
        />
        <h1 className="absolute bottom-2 sm:bottom-5 px-4 sm:px-20 text-white font-extrabold text-2xl sm:text-4xl shadow-2xl uppercase text-shadow-2xs text-shadow-accent-foreground/30">
          Products{" "}
        </h1>
      </div>
      <div className="grid px-6 py-8 grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        <SidebarFilters
          search={search}
          setSearch={setSearch}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <main>
          <ProductGrid search={search} selectedType={selectedType} />
        </main>
      </div>
    </div>
  );
}

const Products = () => {
  return (
    <Suspense
      fallback={
        <p className="h-screen w-full flex items-center justify-center">
          Loading...
        </p>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
};

export default Products;
