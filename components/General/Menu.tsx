"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "../ui/input";
import { client } from "@/sanity/lib/client";

type TypesListProps = { types: string[] };

function TypesListComp({ types }: TypesListProps) {
  return (
    <ul className="grid grid-cols-2 text-white gap-2">
      <li>
        <NavigationMenuLink asChild>
          <DrawerClose asChild>
            <Link className="text-[16px]!" href="/products">
              All Products
            </Link>
          </DrawerClose>
        </NavigationMenuLink>
      </li>
      {types.map((t) => (
        <li key={t}>
          <NavigationMenuLink asChild>
            <DrawerClose asChild>
              <Link
                className="text-[16px]!"
                href={`/products?type=${encodeURIComponent(t)}`}
              >
                {t}
              </Link>
            </DrawerClose>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

export function Menu() {
  const [types, setTypes] = React.useState<string[]>([]);

  React.useEffect(() => {
    // fetch type values from vehicle documents and dedupe
    client
      .fetch<string[]>(`*[_type == "vehicle"].type`)
      .then((res) => {
        const t = Array.from(new Set(res.filter(Boolean)));
        setTypes(t as string[]);
      })
      .catch(() => setTypes([]));
  }, []);
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button>
          <Image src={"/menu.png"} alt="menu icon" width={30} height={30} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-primary rounded-none! px-4 sm:px-20">
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle className=" flex items-center justify-between">
              <Image
                src="/w-logo.png"
                alt="Somoco Logo"
                width={200}
                height={26}
              />
              <DrawerClose asChild>
                <Button size={"icon-lg"}>
                  <X className="size-6" />
                </Button>
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col sm:flex-row text-white p-4 pb-10 justify-between">
            <div className="order-2 w-full">
              <NavigationMenu viewport={false}>
                <NavigationMenuList className="flex items-start flex-col gap-2">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <DrawerClose asChild>
                        <Link className="text-[16px]!" href="/">
                          Home
                        </Link>
                      </DrawerClose>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <DrawerClose asChild>
                        <Link className="text-[16px]!" href="/about">
                          About Us
                        </Link>
                      </DrawerClose>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="relative">
                    <NavigationMenuTrigger className="bg-primary text-[16px] p-2">
                      Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="md:left-full! md:top-0! md:ml-2 p-0.5 min-w-60 border-0! md:-translate-y-2">
                      <TypesListComp types={types} />
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link className="text-[16px]!" href="/services">
                        Services
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link className="text-[16px]!" href="/blogs">
                        Blogs
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link className="text-[16px]!" href="/contact">
                        Contact Us
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="sm:block order-3 hidden w-full">
              <Image
                src={"/menupic.jpg"}
                unoptimized
                alt="warranty"
                width={0}
                height={0}
                className="w-full rounded-lg h-full"
              />
            </div>
            <div className="sm:hidden pb-6 order-1 block w-full">
              <Input placeholder="Search Inventory" />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
