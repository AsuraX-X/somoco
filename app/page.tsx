import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Hero from "@/components/Home/Hero";
import Looking from "@/components/Home/Looking";
import VehicleCarousel from "@/components/Home/VehicleCarousel";
import Why from "@/components/Home/Why";
import Image from "next/image";

const Home = () => {
  return (
    <div className="space-y-20">
      <Hero />
      <VehicleCarousel />
      <Looking />
      <FeaturedProducts />
      <Why />
      <section className="items-center min-h-screen justify-center pt-20 space-y-2 relative text-white text-center w-full">
        <Image
          src={"/banner.png"}
          width={0}
          height={0}
          alt="Somoco Ghana Limited"
          unoptimized
          className="object-cover w-full min-h-screen sm:min-h-auto -z-1 object-left"
        />
        <div className="absolute px-4 top-40 w-full place-content-center">
          <h1 className=" uppercase text-4xl sm:text-6xl font-bold ">
            Somoco Ghana Limited
          </h1>
          <p className="max-w-4xl mx-auto">
            We offer Bajaj, the world’s No. 1 three-wheeler brand, along with
            powerful, durable and sleek Boxer bikes, perfectly suited for your
            daily needs and backed by a 12-month engine warranty.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
