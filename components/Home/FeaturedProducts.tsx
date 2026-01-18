"use client";
import React, { useEffect, useState } from "react";
import { ItemGroup } from "../ui/item";
import VehicleCard from "@/components/General/VehicleCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_VEHICLES_FOR_RANDOM } from "@/sanity/lib/queries";
import type { Vehicle } from "@/sanity.types";

const FeaturedProducts = () => {
  const [models, setModels] = useState<
    Array<{
      id?: string;
      name?: string;
      image?: string;
      engine?: string;
      horsepower?: string;
    }>
  >([]);

  useEffect(() => {
    client
      .fetch(ALL_VEHICLES_FOR_RANDOM)
      .then(
        (
          res: Array<{
            _id?: string;
            name?: Vehicle["name"];
            image?: Vehicle["images"] extends Array<infer U> ? U : unknown;
            engine?: Vehicle["engine"];
            horsepower?: Vehicle["horsepower"];
          }>,
        ) => {
          // Randomly select 3 vehicles from the results
          const shuffled = res.sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 3);

          const mapped = selected.map((v) => ({
            id: v._id,
            name: v.name,
            image: v.image
              ? urlFor(v.image).width(800).height(600).url()
              : undefined,
            engine: v.engine,
            horsepower: v.horsepower,
          }));
          setModels(mapped);
        },
      )
      .catch((err) => console.error("Failed to fetch featured vehicles", err));
  }, []);

  return (
    <div className="px-4 sm:px-8">
      <h1 className="font-bold uppercase text-center text-2xl sm:text-3xl">
        Featured products{" "}
      </h1>{" "}
      <ItemGroup className="grid md:grid-cols-2 py-8 lg:grid-cols-3 gap-4">
        {models.map((model, i) => (
          <VehicleCard
            key={model.id ?? i}
            id={model.id}
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
