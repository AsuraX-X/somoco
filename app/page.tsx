import type { Metadata } from "next";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Hero from "@/components/Home/Hero";
import Looking from "@/components/Home/Looking";
import TyreCarousel from "@/components/Home/TyreCarousel";
import VehicleCarousel from "@/components/Home/VehicleCarousel";
import Why from "@/components/Home/Why";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Bajaj Vehicles, Tyres & Batteries in Ghana",
  description:
    "Somoco Ghana Limited — authorized distributor for Bajaj motorcycles, tricycles, commercial vehicles, tyres, and batteries across Ghana. Explore our full product range today.",
  openGraph: {
    title: "Somoco Ghana Limited | Bajaj Vehicles, Tyres & Batteries",
    description:
      "Authorized distributor for Bajaj motorcycles, tricycles, commercial vehicles, tyres, and batteries across Ghana.",
    url: "https://www.somocoghana.com",
    images: [
      {
        url: "/banners/banner.png",
        width: 1200,
        height: 630,
        alt: "Somoco Ghana Limited",
      },
    ],
  },
  alternates: {
    canonical: "https://www.somocoghana.com",
  },
};

const Home = () => {
  return (
    <div className="space-y-15">
      <Hero />
      <VehicleCarousel />
      <TyreCarousel />
      <Looking />
      <FeaturedProducts />
      <Why />
      <section className="items-center justify-center w-full">
        <Image
          src={"/banners/banner.png"}
          width={0}
          height={0}
          alt="Somoco Ghana Limited"
          unoptimized
          className="object-cover w-full -z-1 object-left"
        />
      </section>
    </div>
  );
};

export default Home;
