"use client";
import Image from "next/image";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const models = [
  {
    name: "Bajaj Qute",
    model: "Qute",
    image: "/Bajaj-Qute.png",
    engine: "217 cc",
  },
  {
    name: "Bajaj Qute",
    model: "Qute",
    image: "/Bajaj-Qute.png",
    engine: "217 cc",
  },
  {
    name: "Bajaj Qute",
    model: "Qute",
    image: "/Bajaj-Qute.png",
    engine: "217 cc",
  },
  {
    name: "Bajaj Qute",
    model: "Qute",
    image: "/Bajaj-Qute.png",
    engine: "217 cc",
  },
  {
    name: "Bajaj Qute",
    model: "Qute",
    image: "/Bajaj-Qute.png",
    engine: "217 cc",
  },
];

const VehicleCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  // selected is a 0-based index of the currently visible slide
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

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
              <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={i}>
                {" "}
                <Item key={i} variant={"outline"}>
                  <ItemHeader className="relative">
                    <Image
                      src={"/inner-bg.png"}
                      alt={"background"}
                      width={128}
                      height={128}
                      unoptimized
                      className="aspect-square absolute w-full rounded-sm object-cover"
                    />
                    <Image
                      src={model.image}
                      alt={model.name}
                      width={128}
                      height={128}
                      unoptimized
                      className="aspect-square z-10 w-full rounded-sm object-cover"
                    />
                  </ItemHeader>
                  <ItemContent>
                    <ItemTitle>{model.name}</ItemTitle>
                    <ItemDescription>{model.model}</ItemDescription>
                    <ItemDescription>{model.engine}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button>Request Quote</Button>
                  </ItemActions>
                </Item>
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
