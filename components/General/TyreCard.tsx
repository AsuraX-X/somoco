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

type Props = {
  name?: string;
  brand: string;
  image?: string;
  sizes?: string[];
  id?: string;
};

export default function TyreCard({ name, brand, image, sizes, id }: Props) {
  const router = useRouter();

  const handleView = () => {
    if (id) router.push(`/tyres/${id}`);
  };

  const sizesList =
    sizes && sizes.length ? (
      <span className="flex flex-col gap-1 text-sm">
        {sizes.map((s) => (
          <span key={s} className="leading-tight">
            {s}
          </span>
        ))}
      </span>
    ) : (
      <div className="text-sm">N/A</div>
    );

  return (
    <Item variant={"outline"}>
      <ItemHeader className="relative">
        {image ? (
          <Image
            src={image}
            alt={name ?? brand}
            width={128}
            height={128}
            unoptimized
            className="z-10 w-full aspect-square rounded-sm object-contain"
          />
        ) : (
          <div className="aspect-square z-10 w-full rounded-sm bg-muted-foreground/10" />
        )}
      </ItemHeader>
      <div className="flex flex-col  w-full">
        <ItemContent>
          <ItemTitle>{name ?? brand}</ItemTitle>
          <ItemDescription className="flex items-center w-full gap-2 ">
            <span className="bg-black/5 size-10 rounded-full aspect-square flex items-center justify-center">
              <Image src={"/tyre.svg"} width={25} height={25} alt="tyre" />
            </span>
            <span className="text-wrap">
              <span className="text-sm font-medium">Available sizes:</span>
              <span className="mt-1">{sizesList}</span>
            </span>
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
