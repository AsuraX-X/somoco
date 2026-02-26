"use client";
import RemoteCarousel from "@/components/Home/RemoteCarousel";
import VehicleCard from "@/components/General/VehicleCard";
import { urlFor } from "@/sanity/lib/image";
import { VEHICLES_FOR_CAROUSEL } from "@/sanity/lib/queries";
import type { Vehicle } from "@/sanity.types";

const VehicleCarousel = () => {
  return (
    <RemoteCarousel
      title={"VEHICLES OF YOUR CHOICE"}
      query={VEHICLES_FOR_CAROUSEL}
      mapToKey={(v: { _id?: string }) => v._id ?? ""}
      renderCard={(v: {
        _id?: string;
        name?: Vehicle["name"];
        image?: Vehicle["images"] extends Array<infer U> ? U : unknown;
        engine?: Vehicle["engine"];
        horsepower?: Vehicle["horsepower"];
      }) => {
        const image = v.image
          ? urlFor(v.image).width(800).auto("format").url()
          : undefined;
        return (
          <VehicleCard
            id={v._id}
            name={v.name}
            image={image}
            engine={v.engine}
            horsepower={v.horsepower}
          />
        );
      }}
    />
  );
};

export default VehicleCarousel;
