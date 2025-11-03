import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "../ui/item";
import Image from "next/image";
import { Button } from "../ui/button";

const FeaturedProducts = () => {
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
  ];

  return (
    <div className="px-4 sm:px-8">
      <h1 className="text-2xl text-center font-bold">Featured Products</h1>
      <ItemGroup className="grid md:grid-cols-2 py-8 lg:grid-cols-3 gap-4">
        {models.map((model, i) => (
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
        ))}
      </ItemGroup>
    </div>
  );
};

export default FeaturedProducts;
