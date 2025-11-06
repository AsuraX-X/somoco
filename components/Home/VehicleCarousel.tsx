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
  const [count, setCount] = useState(0);

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
      setCount(api.scrollSnapList().length);
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
            {models.map((model, i) => (
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
            ))}
          </CarouselContent>
        </Carousel>
        <div className="py-6">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={selected === i ? "true" : undefined}
                className={
                  "h-3 w-3 rounded-full transition-colors focus:outline-none " +
                  (selected === i
                    ? "bg-foreground"
                    : "bg-muted-foreground/40 hover:bg-muted-foreground/60")
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCarousel;
