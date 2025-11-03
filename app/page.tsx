import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Hero from "@/components/Home/Hero";
import Looking from "@/components/Home/Looking";
import VehicleCarousel from "@/components/Home/VehicleCarousel";
import Why from "@/components/Home/Why";

const Home = () => {
  return (
    <div className="space-y-20">
      <Hero />
      <VehicleCarousel />
      <Looking />
      <FeaturedProducts />
      <Why />
      <section className="h-screen pt-20 space-y-2 px-4 text-white text-center w-full bg-left sm:bg-center bg-[url(/banner.png)] sm:bg-contain bg-cover bg-no-repeat">
        <h1 className=" uppercase text-4xl sm:text-6xl font-bold ">Somoco Ghana Limited</h1>
        <p className="max-w-4xl mx-auto">
          We offer Bajaj, the world’s No. 1 three-wheeler brand, along with
          powerful, durable and sleek Boxer bikes, perfectly suited for your
          daily needs and backed by a 12-month engine warranty.
        </p>
      </section>
    </div>
  );
};

export default Home;
