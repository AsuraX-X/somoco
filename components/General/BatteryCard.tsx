"use client";
import Image from "next/image";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
  brand?: string;
  image?: string;
  id?: string;
};

export default function BatteryCard({ name, brand, image, id }: Props) {
  const router = useRouter();

  const handleView = () => {
    if (id) router.push(`/batteries/${id}`);
  };

  return (
    <Item className="h-full flex-col! items-stretch!" variant={"outline"}>
      <div className="relative shrink-0 w-full">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={128}
            height={128}
            unoptimized
            className="z-10 w-full aspect-square rounded-sm object-contain"
          />
        ) : (
          <div className="aspect-square z-10 w-full rounded-sm bg-muted-foreground/10" />
        )}
      </div>
      <div className="flex flex-1 flex-col w-full">
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          {brand && (
            <p className="text-xs text-muted-foreground mt-1">{brand}</p>
          )}
        </ItemContent>
        <ItemActions className="mt-auto">
          <Button
            onClick={handleView}
            variant="default"
            size="sm"
            className="w-full"
          >
            View Details
          </Button>
        </ItemActions>
      </div>
    </Item>
  );
}
