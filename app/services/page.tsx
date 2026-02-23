"use client";

import Schedule from "@/components/Services/Schedule";
import Services from "@/components/Services/Services";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<string>("");

  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const form = document.getElementById("schedule-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="w-full max-h-107.5 relative h-full">
        <Image
          src={"/banners/service-banner.png"}
          alt="service banner"
          width={430}
          height={0}
          unoptimized
          className="h-full w-full"
        />
        <h1 className="absolute bottom-2 sm:bottom-5 px-4 sm:px-20 text-white font-extrabold text-2xl sm:text-4xl shadow-2xl uppercase text-shadow-2xs text-shadow-accent-foreground/30">
          Services
        </h1>
      </div>
      <div className="grid md:max-h-162.5 md:grid-cols-2 gap-4 my-10 px-4 sm:px-20 grid-cols-1">
        <div className="h-full  order-2 md:order-1 flex flex-col justify-center ">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold">
              SOMOCO VEHICLE SERVICE CENTER
            </h1>
            <p>
              We offer 18 months Engine Warranty on our Motorcycle range as well
              as Bajaj R.E tricycles. Our Technical Team & mechanics are readily
              available to offer you the best of maintenance and repair support
              any day.
            </p>
            <p>
              Scroll down and schedule your vehicle maintenance and repair for
              timely service support. We offer Free basic education on
              maintenance and repairs.
            </p>
            <p>
              Fill out the form below and submit for swift and timely booking.
              Our Team will get in touch to confirm your vehicle maintenance &
              servicing appointment.
            </p>
          </div>
          <Button onClick={handleScrollToForm} className="mt-5 text-xl w-fit">
            Get in touch
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
              Service since 10+ years
            </p>
          </div>
        </div>
      </div>
      <div id="schedule-form" className="mt-10 border-y px-4 py-20">
        <h1 className="max-w-3xl mx-auto text-3xl md:text-4xl font-extrabold mb-10">
          Schedule Servicing
        </h1>
        <Schedule selectedService={selectedService} />
      </div>
      <div>
        <Services onServiceSelect={setSelectedService} />
      </div>
    </div>
  );
};

export default ServicesPage;
