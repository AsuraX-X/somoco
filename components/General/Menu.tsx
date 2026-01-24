"use client";

import * as React from "react";
import { X, ChevronRight } from "lucide-react";

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
import { client } from "@/sanity/lib/client";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";

import VehiclesMenu from "./VehiclesMenu";
import BatteriesMenu from "./BatteriesMenu";
import TyresMenu from "./TyresMenu";

export function Menu() {
  const [types, setTypes] = React.useState<string[]>([]);
  const batteryTypes = ["Coming Soon"]; // Static until batteries are implemented
  const [tyreTypes, setTyreTypes] = React.useState<string[]>([]);
  const [view, setView] = React.useState<
    "main" | "vehicles" | "batteries" | "tyres"
  >("main");

  React.useEffect(() => {
    // fetch type values from vehicle documents and dedupe
    client
      .fetch<string[]>(`*[_type == "vehicle"].type`)
      .then((res) => {
        const t = Array.from(new Set(res.filter(Boolean)));
        setTypes(t as string[]);
      })
      .catch(() => setTypes([]));

    // fetch brand values and rankings from tyre documents, then sort brands by their best (lowest) ranking
    client
      .fetch<{ brand?: string; ranking?: number }[]>(
        `*[_type == "tyres" && !disabled]{brand, ranking}`,
      )
      .then((res) => {
        // Build a map of brand -> best (lowest) ranking found
        const brandBest = new Map<string, number>();
        res.forEach((t) => {
          if (!t?.brand) return;
          const r = typeof t.ranking === "number" ? t.ranking : Infinity;
          const prev = brandBest.get(t.brand);
          if (prev === undefined || r < prev) brandBest.set(t.brand, r);
        });

        const sorted = Array.from(brandBest.entries())
          .sort((a, b) => {
            if (a[1] === b[1]) return a[0].localeCompare(b[0]);
            return a[1] - b[1]; // lower ranking first
          })
          .map(([brand]) => brand);

        setTyreTypes(sorted as string[]);
      })
      .catch(() => setTyreTypes([]));
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
                src="/ui/w-logo.png"
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
          <div className="flex flex-col h-full items-start sm:flex-row text-white pb-10 justify-between">
            <div className="w-full h-full ">
              <nav className="">
                <AnimatePresence mode="wait">
                  {view === "main" ? (
                    <motion.ul
                      key="main"
                      initial={{ x: 0, opacity: 1 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className=" flex  flex-col gap-4"
                    >
                      <li>
                        <DrawerClose asChild>
                          <Link
                            className="text-[16px] hover:underline"
                            href="/"
                          >
                            Home
                          </Link>
                        </DrawerClose>
                      </li>

                      <li>
                        <DrawerClose asChild>
                          <Link
                            className="text-[16px] hover:underline"
                            href="/about"
                          >
                            About Us
                          </Link>
                        </DrawerClose>
                      </li>

                      <li>
                        <button
                          onClick={() => setView("vehicles")}
                          className="flex items-center w-full"
                          aria-expanded={false}
                        >
                          <span>Vehicles</span>
                          <ChevronRight size={18} />
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => setView("tyres")}
                          className="flex items-center w-full"
                        >
                          <span>Tyres</span>
                          <ChevronRight size={18} />
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => setView("batteries")}
                          className="flex items-center w-full"
                        >
                          <span>Batteries</span>
                          <ChevronRight size={18} />
                        </button>
                      </li>

                      <li>
                        <DrawerClose asChild>
                          <Link
                            className="text-[16px] hover:underline"
                            href="/services"
                          >
                            Services
                          </Link>
                        </DrawerClose>
                      </li>
                      <li>
                        <DrawerClose asChild>
                          <Link
                            className="text-[16px] hover:underline"
                            href="/spare-parts"
                          >
                            Spare Parts
                          </Link>
                        </DrawerClose>
                      </li>

                      <li>
                        <DrawerClose asChild>
                          <Link
                            className="text-[16px] hover:underline"
                            href="/blogs"
                          >
                            Blogs
                          </Link>
                        </DrawerClose>
                      </li>

                      <li>
                        <DrawerClose asChild>
                          <Link
                            className="text-[16px] hover:underline"
                            href="/contact"
                          >
                            Contact Us
                          </Link>
                        </DrawerClose>
                      </li>
                    </motion.ul>
                  ) : view === "vehicles" ? (
                    <VehiclesMenu
                      types={types}
                      onBack={() => setView("main")}
                      onSelect={() => setView("main")}
                    />
                  ) : view === "batteries" ? (
                    <BatteriesMenu
                      types={batteryTypes}
                      onBack={() => setView("main")}
                      onSelect={() => setView("main")}
                    />
                  ) : (
                    <TyresMenu
                      types={tyreTypes}
                      onBack={() => setView("main")}
                      onSelect={() => setView("main")}
                    />
                  )}
                </AnimatePresence>
              </nav>
            </div>
            <div className="sm:block hidden h-full items-center w-full">
              <Image
                src={"/menupic.jpg"}
                unoptimized
                alt="warranty"
                width={0}
                height={0}
                className="w-full rounded-lg h-full"
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
