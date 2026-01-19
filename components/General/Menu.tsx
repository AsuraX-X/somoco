"use client";

import * as React from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

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

type TypesListProps = {
  types: string[];
  basePath?: string;
  onSelect?: () => void;
};

function TypesListComp({
  types,
  basePath = "/vehicles",
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
              href={`${basePath}?type=${encodeURIComponent(t)}`}
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

    // fetch brand values from tyre documents and dedupe
    client
      .fetch<string[]>(`*[_type == "tyres"].brand`)
      .then((res) => {
        const brands = Array.from(new Set(res.filter(Boolean)));
        setTyreTypes(brands as string[]);
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
                          onClick={() => setView("batteries")}
                          className="flex items-center w-full"
                        >
                          <span>Batteries</span>
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
                    <motion.ul
                      key="vehicles"
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="flex h-full flex-col gap-4"
                    >
                      <li>
                        <button
                          onClick={() => setView("main")}
                          className="flex items-center gap-2"
                        >
                          <ChevronLeft size={18} />
                          <span>Back</span>
                        </button>
                      </li>
                      <li className="mt-2">
                        <TypesListComp
                          types={types}
                          basePath="/vehicles"
                          onSelect={() => setView("main")}
                        />
                      </li>
                    </motion.ul>
                  ) : view === "batteries" ? (
                    <motion.ul
                      key="batteries"
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="flex h-full flex-col gap-4"
                    >
                      <li>
                        <button
                          onClick={() => setView("main")}
                          className="flex items-center gap-2"
                        >
                          <ChevronLeft size={18} />
                          <span>Back</span>
                        </button>
                      </li>
                      <li className="mt-2">
                        <TypesListComp
                          types={batteryTypes}
                          basePath="/batteries"
                          onSelect={() => setView("main")}
                        />
                      </li>
                    </motion.ul>
                  ) : (
                    <motion.ul
                      key="tyres"
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="flex h-full flex-col gap-4"
                    >
                      <li>
                        <button
                          onClick={() => setView("main")}
                          className="flex items-center gap-2"
                        >
                          <ChevronLeft size={18} />
                          <span>Back</span>
                        </button>
                      </li>
                      <li className="mt-2">
                        <TypesListComp
                          types={tyreTypes}
                          basePath="/tyres"
                          onSelect={() => setView("main")}
                        />
                      </li>
                    </motion.ul>
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
