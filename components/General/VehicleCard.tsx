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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";

type Props = {
  name?: string;
  image?: string;
  engine?: string;
  horsepower?: string;
  id?: string;
};

export default function VehicleCard({
  name,
  image,
  engine,
  horsepower,
  id,
}: Props) {
  const router = useRouter();

  const handleView = () => {
    if (id) router.push(`/vehicles/${id}`);
  };
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
            className="aspect-square z-10 w-full rounded-sm object-contain"
          />
        ) : (
          <div className="aspect-square z-10 w-full rounded-sm bg-muted-foreground/10" />
        )}
      </ItemHeader>
      <div className="flex flex-col  w-full">
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription className="flex items-center w-full gap-2 ">
            <span className="bg-black/5 size-10 rounded-full aspect-square flex items-center justify-center">
              <Image src={"/engine.svg"} width={30} height={30} alt="engine" />
            </span>
            <span className=" text-wrap">{engine}</span>
          </ItemDescription>
          <ItemDescription className="flex items-center w-full gap-2">
            <span className="bg-black/5 size-10 rounded-full aspect-square flex items-center justify-center">
              <Zap strokeWidth={1} color="#000000" />
            </span>
            <span className=" text-wrap">{horsepower}</span>
          </ItemDescription>
        </ItemContent>
        <ItemActions className="flex gap-4">
          <Button className="mt-4 flex-1" onClick={handleView}>
            View Details
          </Button>
          <Button
            className="flex-1 mt-4"
            onClick={() => {
              if (id) router.push(`/compare?v1=${encodeURIComponent(id)}`);
            }}
          >
            Compare
          </Button>
        </ItemActions>
      </div>
    </Item>
  );
}
