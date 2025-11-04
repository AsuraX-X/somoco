"use client";
import React, { useEffect, useState } from "react";
import { ItemGroup } from "../ui/item";
import VehicleCard from "@/components/Home/VehicleCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { LATEST_3_VEHICLES } from "@/sanity/lib/queries";
import type { Vehicle } from "@/sanity.types";

const FeaturedProducts = () => {
  const [models, setModels] = useState<
    Array<{
      name?: string;
      image?: string;
      engine?: string;
      horsepower?: string;
    }>
  >([]);

  useEffect(() => {
    client
      .fetch(LATEST_3_VEHICLES)
      .then(
        (
          res: Array<{
            name?: Vehicle["name"];
            image?: Vehicle["images"] extends Array<infer U> ? U : unknown;
            engine?: Vehicle["engine"];
            horsepower?: Vehicle["horsepower"];
          }>
        ) => {
          const mapped = res.map((v) => ({
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
      .catch((err) => console.error("Failed to fetch featured vehicles", err));
  }, []);

  return (
    <div className="px-4 sm:px-8">
      <h1 className="text-2xl text-center font-bold">Featured Products</h1>
      <ItemGroup className="grid md:grid-cols-2 py-8 lg:grid-cols-3 gap-4">
        {models.map((model, i) => (
          <VehicleCard
            key={i}
            name={model.name}
            image={model.image}
            engine={model.engine}
            horsepower={model.horsepower}
          />
        ))}
      </ItemGroup>
    </div>
  );
};

export default FeaturedProducts;
