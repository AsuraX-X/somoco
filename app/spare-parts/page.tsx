"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useCallback } from "react";
import OrderForm from "@/components/Spare/OrderForm";

const SpareParts = () => {
  const handleScrollToForm = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const form = document.getElementById("order-form");
    if (form) form.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="w-full max-h-107.5 relative h-full">
        <Image
          src={"/banners/Spares.jpg"}
          alt="service banner"
          width={430}
          height={0}
          unoptimized
          className="h-full w-full"
        />
        <h1 className="absolute bottom-2 sm:bottom-5 px-4 sm:px-20 text-white font-extrabold text-2xl sm:text-4xl shadow-2xl uppercase text-shadow-2xs text-shadow-accent-foreground/30">
          Spare Parts
        </h1>
      </div>
      <div className="grid md:max-h-162.5 md:grid-cols-2 gap-4 my-10 px-4 sm:px-20 grid-cols-1">
        <div className="h-full  order-2 md:order-1 flex flex-col justify-center ">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold">SOMOCO SPARE PARTS</h1>
            <p>
              We stock a wide range of genuine spare parts for motorcycles and
              commercial vehicles, including Bajaj and select partner brands.
              Lookup availability and place orders for parts you need.
            </p>
            <p>
              Whether you need a filter, brake pads, or replacement body parts,
              our team can check stock, provide pricing, and arrange delivery.
            </p>
            <p>
              Scroll down to place an order. Use the form to include part names,
              part numbers (if available), quantity, and preferred collection
              region.
            </p>
          </div>
          <Button onClick={handleScrollToForm} className="text-xl mt-5 w-fit">
            Order Spare Parts
          </Button>
        </div>
        <div className="flex  order-1 md:order-2 gap-8">
          <div className="w-full">
            <Image
              src={"/services/service-1.png"}
              width={0}
              height={0}
              alt="service image"
              unoptimized
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
          <div className="w-full capitalize flex items-center justify-center bg-primary text-white rounded-lg max-w-28.75">
            <p className="sm:text-3xl text-2xl rotate-90 text-nowrap ">
              Genuine spare parts
            </p>
          </div>
        </div>
      </div>
      <div id="order-form" className="mt-10 border-y px-4 py-20">
        <h1 className="max-w-3xl mx-auto text-3xl md:text-4xl font-extrabold mb-10">
          Order For Spare Parts
        </h1>
        <div className="max-w-3xl mx-auto">
          <OrderForm />
        </div>
      </div>
    </div>
  );
};

export default SpareParts;
