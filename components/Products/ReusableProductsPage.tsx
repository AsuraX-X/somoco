"use client";
import React, { Suspense, useEffect, useState } from "react";
import SidebarFilters from "@/components/Products/SidebarFilters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

type ProductsPageProps = {
  title: string;
  bannerImage: string;
  bannerAlt: string;
  contentType: string; // "vehicle" or "tyre"
  filterField: string; // "type" for vehicles, "brand" for tyres
  filterLabel: string; // "Type" for vehicles, "Brand" for tyres
  searchPlaceholder: string;
  GridComponent: React.ComponentType<{
    search: string;
    selectedType?: string;
  }>;
};

function ProductsPageContent({
  title,
  bannerImage,
  bannerAlt,
  contentType,
  filterField,
  filterLabel,
  searchPlaceholder,
  GridComponent,
}: ProductsPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize from URL params
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [selectedType, setSelectedType] = useState<string | undefined>(
    () => searchParams.get(filterField) ?? undefined,
  );

  // When params change externally (back/forward), keep local state in sync
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const type = searchParams.get(filterField) ?? undefined;
    setSearch(q);
    setSelectedType(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString(), filterField]);

  // Push state to URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search && search.trim() !== "") params.set("q", search);
    if (selectedType && selectedType !== "")
      params.set(filterField, selectedType);

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    // replace so we don't create history entries on each change
    router.replace(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedType, filterField, pathname]);

  return (
    <div className="min-h-screen">
      <div className="w-full max-h-[430px] relative h-full">
        <Image
          src={bannerImage}
          alt={bannerAlt}
          width={430}
          height={0}
          unoptimized
          className="h-full w-full"
        />
        <h1 className="absolute bottom-2 sm:bottom-5 px-4 sm:px-20 text-white font-extrabold text-2xl sm:text-4xl shadow-2xl uppercase text-shadow-2xs text-shadow-accent-foreground/30">
          {title}
        </h1>
      </div>
      <div className="grid px-6 py-8 grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        <SidebarFilters
          search={search}
          setSearch={setSearch}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          contentType={contentType}
          filterField={filterField}
          filterLabel={filterLabel}
          searchPlaceholder={searchPlaceholder}
        />
        <main>
          <GridComponent search={search} selectedType={selectedType} />
        </main>
      </div>
    </div>
  );
}

type ReusableProductsPageProps = Omit<ProductsPageProps, "GridComponent"> & {
  GridComponent: React.ComponentType<{
    search: string;
    selectedType?: string;
  }>;
};

const ReusableProductsPage = (props: ReusableProductsPageProps) => {
  return (
    <Suspense
      fallback={
        <p className="h-screen w-full flex items-center justify-center">
          Loading...
        </p>
      }
    >
      <ProductsPageContent {...props} />
    </Suspense>
  );
};

export default ReusableProductsPage;
