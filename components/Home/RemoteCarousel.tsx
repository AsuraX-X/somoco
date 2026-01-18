"use client";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/sanity/lib/client";

type Props<T> = {
  title?: string;
  query: string;
  renderCard: (item: T) => React.ReactNode;
  itemClassName?: string;
  placeholderCount?: number;
  mapToKey?: (item: T, index: number) => string | number;
};

export default function RemoteCarousel<T>({
  title,
  query,
  renderCard,
  itemClassName = "md:basis-1/2 lg:basis-1/3",
  placeholderCount = 3,
  mapToKey,
}: Props<T>) {
  const [api, setApi] = useState<CarouselApi>();
  const [items, setItems] = useState<T[]>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    client
      .fetch(query)
      .then((res: T[]) => {
        setItems(res || []);
      })
      .catch((err) => {
        console.error("Failed to fetch carousel data", err);
      });
  }, [query]);

  useEffect(() => {
    if (!api) return;

    const t = window.setTimeout(() => {
      setSelected(api.selectedScrollSnap());
    }, 0);

    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off?.("select", onSelect);
      clearTimeout(t);
    };
  }, [api]);

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <div className="px-4 sm:px-8">
      {title && (
        <div>
          <h1 className="font-bold text-center text-2xl sm:text-3xl">
            {title}
          </h1>
        </div>
      )}
      <div className="py-8">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          setApi={setApi}
          className="flex cursor-grab active:cursor-grabbing flex-col gap-6"
        >
          <CarouselContent>
            {items.length > 0
              ? items.map((it, i) => (
                  <CarouselItem
                    className={itemClassName}
                    key={mapToKey ? mapToKey(it, i) : i}
                  >
                    {renderCard(it)}
                  </CarouselItem>
                ))
              : // Loading placeholders
                Array.from({ length: placeholderCount }).map((_, i) => (
                  <CarouselItem
                    className={itemClassName}
                    key={`placeholder-${i}`}
                  >
                    <div className="border rounded-lg p-4 space-y-4">
                      <Skeleton className="aspect-square w-full rounded-md" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-9 flex-1" />
                        <Skeleton className="h-9 flex-1" />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
        <div className="py-6">
          <div className="flex items-center justify-center gap-2">
            {items.length > 0 &&
              Array.from({ length: items.length }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={selected === i ? "true" : undefined}
                  className={`h-3 w-3 cursor-pointer rounded-full transition-colors focus:outline-none ${
                    selected === i
                      ? "bg-primary"
                      : "bg-muted-foreground/60 hover:bg-muted-foreground/80"
                  }`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
