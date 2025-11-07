"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const Hero = () => {
  const banners = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      className="mx-auto car cursor-grab active:cursor-grabbing relative max-w-screen"
    >
      <CarouselContent>
        {banners.map((_, index) => (
          <CarouselItem key={index}>
            <div>
              <Card className="rounded-none p-0">
                <CardContent className="flex h-fit bg-amber-200 items-center justify-center p-0">
                  <Image
                    src={_}
                    width={0}
                    height={0}
                    unoptimized
                    alt={`banner image-${index + 1}`}
                    className="w-full h-full object cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant={"outline"}
        className="absolute hidden sm:flex top-1/2 left-5 scale-125 cursor-pointer"
      />
      <CarouselNext
        variant={"outline"}
        className="absolute hidden sm:flex top-1/2 right-5 scale-125 cursor-pointer"
      />
    </Carousel>
  );
};

export default Hero;
