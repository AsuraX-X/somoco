import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Looking = () => {
  return (
    <section>
      <div className="md:flex hidden overflow-x-hidden h-screen w-full">
        <div className="flex gap-4 flex-col flex-1">
          <div className="h-full w-full relative ">
            <Image
              src="/eco-1.png"
              alt="motor rider"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div>
            <Image
              src="/eco-2.png"
              alt="motor rider"
              height={375}
              width={0}
              unoptimized
              className="object-cover w-full"
            />
          </div>
        </div>
        <div className="flex-1 flex-col flex px-10 max-w-1/2">
          <div className="flex h-full flex-col gap-8 ">
            <h1 className="flex font-extrabold text-3xl lg:text-5xl flex-col gap-2">
              <span>ARE YOU</span> <span> LOOKING FOR AN</span>
              <span className=" lg:text-[90px] text-6xl  whitespace-nowrap z-10 -ml-50 lg:-ml-100">
                {" "}
                ECONOMICAL BIKE?
              </span>
            </h1>
            <p>
              We have the most efficient yet durable and low fuel consumption
              motorbikes- Boxer 100 and Boxer 125.
            </p>
            <Link href={"/contact"}>
              <Button className="w-fit text-xl px-8 mb-4 h-12 cursor-pointer">
                Contact Us
              </Button>
            </Link>
          </div>
          <div className="flex flex-col h-full w-full">
            <div className="flex h-full gap-6">
              <div className="w-2/3 relative h-full">
                <Image
                  src="/eco-3.png"
                  alt="motor rider"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="w-1/3 relative h-full">
                <Image
                  src="/eco-4.png"
                  alt="motor rider"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="font-extrabold text-3xl/6 mt-2">
                LOOKING FOR GENUINE BIKE ACCESSORIES?
              </h2>
              <p>
                We have a wide portfolio of parts and accessories for your
                biking needs. Call 054 011 2783 today! CONTACT US
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex flex-col">
        <div>
          <Image
            src="/eco-1.png"
            width={0}
            height={0}
            alt="motor rider"
            unoptimized
            className="w-full h-full"
          />
          <div className="p-4 space-y-4 ">
            <h2 className="text-xl font-bold">
              ARE YOU LOOKING FOR AN ECONOMICAL BIKE?
            </h2>
            <p>
              We have the most efficient yet durable and low fuel consumption
              motorbikes- Boxer 100 and Boxer 125.
            </p>
            <Button>Contact Us</Button>
          </div>
        </div>
        <div>
          <div className="flex h-80 gap-4 mt-8">
            <div className="w-2/3 relative h-full">
              <Image
                src="/eco-3.png"
                alt="motor rider"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="w-1/3 relative h-full">
              <Image
                src="/eco-4.png"
                alt="motor rider"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
          <div className="p-4 space-y-4 ">
            <h2 className="text-xl font-bold">
              LOOKING FOR GENUINE BIKE ACCESSORIES?
            </h2>
            <p>
              We have a wide portfolio of parts and accessories for your biking
              needs. Call 054 011 2783 today! CONTACT US
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Looking;
