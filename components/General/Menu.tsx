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

export function Menu() {
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button>
          Menu{" "}
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
                      <Link href="/">Home</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/about">About Us</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="relative">
                    <NavigationMenuTrigger className="bg-primary p-2">
                      Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="md:left-full! md:top-0! md:ml-2 p-0.5 min-w-60 border-0! md:-translate-y-2">
                      <ul className="grid grid-cols-2 text-white gap-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/products">All Products</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/products/category-a">Category A</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/products/category-b">Category B</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/products">All Products</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/products/category-b">Category B</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/products">All Products</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/products/category-a">Category A</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/products/category-b">Category B</Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/services">Services</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/blogs">Blogs</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/contact">Contact Us</Link>
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
