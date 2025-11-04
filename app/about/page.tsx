"use client";
import Bajaj from "@/components/About/Bajaj";
import Mohinani from "@/components/About/Mohinani";
import Somoco from "@/components/About/Somoco";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const AboutUs = () => {
  const [focus, setFocus] = useState("Mohinani");

  return (
    <div>
      <div className="w-full max-h-[430px] relative h-full bg-amber-200">
        <Image
          src={"/about-banner.png"}
          alt="about us banner"
          width={430}
          height={0}
          unoptimized
          className="h-full w-full"
        />
        <p className="absolute bottom-2 sm:bottom-5 px-4 sm:px-20 text-white font-extrabold text-2xl sm:text-4xl shadow-2xl text-shadow-2xs text-shadow-accent-foreground/30">
          About Us
        </p>
      </div>
      <div className="sm:px-20 gap-10 mt-10 px-4 flex flex-col md:flex-row">
        <div className="flex flex-col md:sticky h-fit top-15 min-w-60 divide-y">
          <button
            onClick={() => {
              setFocus("Mohinani");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`py-2 flex ${
              focus === "Mohinani" ? "text-black" : "text-black/50"
            } items-center justify-between`}
          >
            Mohinani Group {focus === "Mohinani" && <ArrowRight size={20} />}
          </button>
          <button
            onClick={() => {
              setFocus("Somoco");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`py-2 flex ${
              focus === "Somoco" ? "text-black" : "text-black/50"
            } items-center justify-between`}
          >
            Somoco Ghana Limited{" "}
            {focus === "Somoco" && <ArrowRight size={20} />}
          </button>
          <button
            onClick={() => {
              setFocus("Bajaj");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`py-2 flex ${
              focus === "Bajaj" ? "text-black" : "text-black/50"
            } items-center justify-between`}
          >
            Bajaj Auto {focus === "Bajaj" && <ArrowRight size={20} />}
          </button>
        </div>
        <div className="w-full text-sm text-justify">
          {focus === "Mohinani" && <Mohinani />}
          {focus === "Somoco" && <Somoco />}
          {focus === "Bajaj" && <Bajaj />}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
