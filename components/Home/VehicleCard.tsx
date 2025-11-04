"use client";
import Image from "next/image";
import React from "react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

type Props = {
  name?: string;
  image?: string;
  engine?: string;
  horsepower?: string;
};

export default function VehicleCard({
  name,
  image,
  engine,
  horsepower,
}: Props) {
  return (
    <Item variant={"outline"}>
      <ItemHeader className="relative">
        <Image
          src={"/inner-bg.png"}
          alt={"background"}
          width={128}
          height={128}
          unoptimized
          className="aspect-square absolute w-full rounded-sm object-cover"
        />
        {image ? (
          <Image
            src={image}
            alt={name ?? "vehicle image"}
            width={128}
            height={128}
            unoptimized
            className="aspect-square z-10 w-full rounded-sm object-cover"
          />
        ) : (
          <div className="aspect-square z-10 w-full rounded-sm bg-muted-foreground/10" />
        )}
      </ItemHeader>
      <div className="flex flex-col">
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription className="flex items-center w-full gap-2 ">
            <div className="bg-black/5 p-2 rounded-full aspect-square flex items-center justify-">
              <Image src={"/engine.svg"} width={30} height={30} alt="engine" />
            </div>
            <p className=" text-wrap">{engine}</p>
          </ItemDescription>
          <ItemDescription className="flex items-center w-full gap-2">
            <div className="bg-black/5 p-2 rounded-full aspect-square flex items-center justify-">
              <Zap strokeWidth={1} color="#000000" />
            </div>
            <p className=" text-wrap">{horsepower}</p>
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button className="w-full mt-4">View Details</Button>
        </ItemActions>
      </div>
    </Item>
  );
}
