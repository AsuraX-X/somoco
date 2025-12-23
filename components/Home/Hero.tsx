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
import { useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  const banners = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  const handleImageLoad = (src: string) => {
    setImagesLoaded((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      className="mx-auto car cursor-grab active:cursor-grabbing relative max-w-screen"
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <div>
              <Card className="rounded-none p-0">
                <CardContent className="flex h-fit items-center justify-center p-0">
                  {!imagesLoaded[banner] && (
                    <Skeleton className="min-w-screen h-[400px] sm:h-[500px] lg:h-[600px]" />
                  )}
                  <Image
                    src={banner}
                    width={0}
                    height={0}
                    unoptimized
                    alt={`banner image-${index + 1}`}
                    className={`w-full h-full object-cover ${
                      imagesLoaded[banner] ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                    onLoad={() => handleImageLoad(banner)}
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
