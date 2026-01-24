"use client";

import Link from "next/link";
import { DrawerClose } from "@/components/ui/drawer";

type TypesListProps = {
  types: string[];
  basePath?: string;
  paramName?: string;
  onSelect?: () => void;
};

export default function TypesList({
  types,
  basePath = "/vehicles",
  paramName = "type",
  onSelect,
}: TypesListProps) {
  const name = basePath.replace("/", "");
  const title = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <ul className="grid grid-cols-2 text-white gap-2">
      <li>
        <DrawerClose asChild>
          <Link
            className="text-[16px] hover:underline"
            href={basePath}
            onClick={() => onSelect?.()}
          >
            {`All ${title}`}
          </Link>
        </DrawerClose>
      </li>
      {types.map((t) => (
        <li key={t}>
          <DrawerClose asChild>
            <Link
              className="text-[16px] hover:underline"
              href={`${basePath}?${paramName}=${encodeURIComponent(t)}`}
              onClick={() => onSelect?.()}
            >
              {t}
            </Link>
          </DrawerClose>
        </li>
      ))}
    </ul>
  );
}
