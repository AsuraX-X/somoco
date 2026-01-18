"use client";
import RemoteCarousel from "@/components/Home/RemoteCarousel";
import TyreCard from "@/components/General/TyreCard";
import { urlFor } from "@/sanity/lib/image";
import { TYRES_FOR_CAROUSEL } from "@/sanity/lib/queries";
import type { Tyres } from "@/sanity.types";

// Narrowed type for items returned by TYRES_FOR_CAROUSEL (no `any` used)
type TyreCarouselItem = {
  _id?: string;
  name?: Tyres["name"];
  brand?: Tyres["brand"];
  image?: Tyres["images"] extends Array<infer U> ? U : unknown;
  sizes?: Tyres["sizes"];
};

const TyreCarousel = () => {
  return (
    <RemoteCarousel
      title={"POPULAR TYRES"}
      query={TYRES_FOR_CAROUSEL}
      mapToKey={(t: TyreCarouselItem) => t._id ?? ""}
      renderCard={(t: TyreCarouselItem) => {
        const image = t.image
          ? urlFor(t.image).width(800).height(600).url()
          : undefined;
        return (
          <TyreCard
            id={t._id}
            name={t.name}
            brand={t.brand ?? ""}
            image={image}
            sizes={t.sizes}
          />
        );
      }}
    />
  );
};

export default TyreCarousel;
