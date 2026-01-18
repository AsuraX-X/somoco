import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Hero from "@/components/Home/Hero";
import Looking from "@/components/Home/Looking";
import TyreCarousel from "@/components/Home/TyreCarousel";
import VehicleCarousel from "@/components/Home/VehicleCarousel";
import Why from "@/components/Home/Why";
import Image from "next/image";

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
          src={"/banner.png"}
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
