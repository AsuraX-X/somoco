"use client";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import VehicleCard from "@/components/Home/VehicleCard";
import { Skeleton } from "@/components/ui/skeleton";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { VEHICLES_FOR_CAROUSEL } from "@/sanity/lib/queries";
import type { Vehicle } from "@/sanity.types";

const VehicleCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [models, setModels] = useState<
    Array<{
      id?: string;
      name?: string;
      image?: string;
      engine?: string;
      horsepower?: string;
    }>
  >([]);
  // selected is a 0-based index of the currently visible slide
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    // Fetch vehicles from Sanity
    client
      .fetch(VEHICLES_FOR_CAROUSEL)
      .then(
        (
          res: Array<{
            _id?: string;
            name?: Vehicle["name"];
            image?: Vehicle["images"] extends Array<infer U> ? U : unknown;
            engine?: Vehicle["engine"];
            horsepower?: Vehicle["horsepower"];
          }>
        ) => {
          const mapped = res.map((v) => ({
            id: v._id,
            name: v.name,
            image: v.image
              ? urlFor(v.image).width(800).height(600).url()
              : undefined,
            engine: v.engine,
            horsepower: v.horsepower,
          }));
          setModels(mapped);
        }
      )
      .catch((err) => {
        // keep silent; could add logger
        console.error("Failed to fetch vehicles", err);
      });
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    // Defer initial state updates to avoid synchronous setState inside effect
    const t = window.setTimeout(() => {
      setSelected(api.selectedScrollSnap());
    }, 0);

    const onSelect = () => {
      setSelected(api.selectedScrollSnap());
    };
    api.on("select", onSelect);

    return () => {
      // remove listener if supported and clear timeout
      api.off?.("select", onSelect);
      clearTimeout(t);
    };
  }, [api]);

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <div className="px-4 sm:px-8">
      <div>
        <h1 className="font-bold text-center text-2xl sm:text-3xl">
          VEHICLES OF YOUR CHOICE
        </h1>
      </div>
      <div className="py-8">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[plugin.current]}
          setApi={setApi}
          className="flex cursor-grab active:cursor-grabbing flex-col gap-6"
        >
          <CarouselContent>
            {models.length > 0
              ? models.map((model, i) => (
                  <CarouselItem
                    className="md:basis-1/2 lg:basis-1/3"
                    key={model.id ?? i}
                  >
                    <VehicleCard
                      id={model.id}
                      name={model.name}
                      image={model.image}
                      engine={model.engine}
                      horsepower={model.horsepower}
                    />
                  </CarouselItem>
                ))
              : // Loading placeholders
                Array.from({ length: 3 }).map((_, i) => (
                  <CarouselItem
                    className="md:basis-1/2 lg:basis-1/3"
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
            {models.length > 0 &&
              Array.from({ length: models.length }).map((_, i) => (
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
};

export default VehicleCarousel;
