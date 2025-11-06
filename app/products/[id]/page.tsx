import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { VEHICLE_BY_ID, VEHICLE_BY_SLUG } from "@/sanity/lib/queries";
import type { Vehicle } from "@/sanity.types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

type Props = {
  params: { id: string };
};

function plainTextFromBlocks(blocks?: Vehicle["description"]) {
  if (!blocks) return null;
  return blocks
    .map((blk) => {
      const children = blk?.children ?? [];
      return children.map((c) => c?.text ?? "").join("");
    })
    .join("\n\n");
}

export default async function VehiclePage({ params }: Props) {
  // In Next.js App Router, `params` can be a Promise depending on usage.
  // Await it before accessing properties to avoid runtime errors.
  const { id } = (await params) as { id?: string };
  // Defensive check: return a safe not-found UI when id is missing.
  if (!id) {
    return <div className="p-8">Vehicle not found.</div>;
  }

  // Do not construct JSX inside try/catch — collect plain data/state and render after the try/catch.
  let vehicleToRender: Vehicle | null = null;
  let fetchError: Error | null = null;
  let notFound = false;

  try {
    const vehicle = await client.fetch<Vehicle | null>(VEHICLE_BY_ID, { id });

    // If not found by _id, attempt a slug-based lookup as a fallback (in case the route uses slugs)
    if (!vehicle) {
      // If the id looks like a slug (contains letters/dashes) try slug lookup
      const looksLikeSlug = /[a-zA-Z\-]/.test(id);
      if (looksLikeSlug) {
        // Trying slug lookup as a fallback
        const bySlug = await client.fetch<Vehicle | null>(VEHICLE_BY_SLUG, {
          slug: id,
        });
        if (bySlug) {
          // assign the slug-found document to be rendered after the try/catch
          vehicleToRender = bySlug;
        } else {
          notFound = true;
        }
      } else {
        notFound = true;
      }
    } else {
      vehicleToRender = vehicle;
    }
  } catch (err) {
    // Log full error server-side to aid debugging (avoid exposing stack to users)
    console.error("VehiclePage: error fetching vehicle", { err, id });
    fetchError = (err as Error) ?? new Error(String(err));
  }

  // Render after try/catch (no JSX inside try/catch)
  if (fetchError) {
    return (
      <div className="p-8">
        <h2 className="text-lg font-semibold">Error loading vehicle</h2>
        <p className="text-sm text-muted-foreground mt-2">
          {fetchError.message ?? String(fetchError)}
        </p>
      </div>
    );
  }

  if (notFound) {
    return <div className="p-8">Vehicle not found.</div>;
  }

  if (vehicleToRender) {
    return renderVehicle(vehicleToRender);
  }

  // Fallback if nothing matched (safe default)
  return <div className="p-8">Vehicle not found.</div>;

  // Extracted small renderer so we can return early from the try/catch branches above
  function renderVehicle(vehicle: Vehicle) {
    const header1 = vehicle.headerImage1
      ? urlFor(vehicle.headerImage1).width(1600).height(600).url()
      : undefined;
    const header2 = vehicle.headerImage2
      ? urlFor(vehicle.headerImage2).width(1200).height(400).url()
      : undefined;

    const description = plainTextFromBlocks(vehicle.description);

    type ImgType =
      | NonNullable<Vehicle["images"]>[number]
      | NonNullable<Vehicle["gallery"]>[number]["image"];
    const imagesToShow: ImgType[] =
      vehicle.images && vehicle.images.length
        ? vehicle.images
        : vehicle.gallery?.map((g) => g.image) ?? [];

    return (
      <div>
        <div
          className="w-full h-[60vh] bg-cover bg-center flex items-end p-4"
          style={{ backgroundImage: `url(${header1})` }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-white  px-6 py-3 rounded">
            {vehicle.name}
          </h1>
        </div>

        {/* Name + description */}
        <div className="max-w-7xl grid sm:grid-cols-2 items-center grid-cols-1 mx-auto px-6 py-12">
          <div>
            <h2 className="text-3xl font-semibold mb-4">{vehicle.name}</h2>
            {description ? (
              <p className="prose text-base text-muted-foreground">
                {description}
              </p>
            ) : null}

            {/* Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-8">
              <div>
                <h4 className="text-sm font-medium">Capacity</h4>
                <p className="text-2xl">{vehicle.capacity ?? "—"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Torque</h4>
                <p className="text-2xl">{vehicle.torque ?? "—"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Horsepower</h4>
                <p className="text-2xl">{vehicle.horsepower ?? "—"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Engine</h4>
                <p className="text-2xl">{vehicle.engine ?? "—"}</p>
              </div>
            </div>
          </div>
          <div>
            {(vehicle.images?.length || vehicle.gallery?.length) && (
              <section className="max-w-6xl mx-auto px-6 py-12">
                <Carousel opts={{ loop: true }} className="relative">
                  <CarouselContent className="">
                    {imagesToShow.map((img, idx) => (
                      <CarouselItem key={idx}>
                        {img ? (
                          <div className="rounded">
                            <div className="relative w-full h-[280px] sm:h-[360px] md:h-[450px]">
                              <Image
                                src={urlFor(img).url()}
                                alt={vehicle.name ?? "vehicle image"}
                                fill
                                unoptimized
                                className="object-contain rounded"
                              />
                            </div>
                          </div>
                        ) : null}
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="sm:absolute flex top-1/2 ml-4 sm:ml-0 sm:left-4 scale-125 cursor-pointer" />
                  <CarouselNext className="sm:absolute flex top-1/2 mr-4 sm:mr-0  sm:right-4 scale-125 cursor-pointer" />
                </Carousel>
              </section>
            )}
          </div>
        </div>

        {header2 && (
          <div className="w-full max-w-5xl mx-auto mt-6">
            <Image
              src={header2}
              alt={`${vehicle.name} header 2`}
              width={0}
              height={0}
              unoptimized
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Gallery */}
        {vehicle.gallery && vehicle.gallery.length > 0 && (
          <section className="max-w-6xl mt-20 mx-auto px-6 py-12">
            <h3 className="text-2xl sm:text-3xl  font-semibold mb-6">
              Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicle.gallery.map((g) => (
                <div
                  key={g._key}
                  className="bg-card max-w-110 rounded overflow-hidden"
                >
                  {g.image && (
                    <div className="relative w-full h-48 sm:h-56 md:h-64">
                      <Image
                        src={urlFor(g.image).url()}
                        alt={g.title ?? vehicle.name ?? "gallery"}
                        fill
                        unoptimized
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  <div className="py-4 h-full w-full">
                    <h4 className="font-medium">{g.title}</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      {g.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical features (use shadcn accordion) */}
        {vehicle.technicalFeatures && (
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h3 className="text-2xl font-semibold mb-6">Technical Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Accordion per category */}
              <div className="col-span-1 md:col-span-2">
                {/* Import client-side accordion component to render collapsible lists */}
                <Accordion type="single" collapsible>
                  {Object.entries(vehicle.technicalFeatures || {}).map(
                    ([cat, items], idx) => (
                      <AccordionItem value={String(idx)} key={cat}>
                        <AccordionTrigger className="capitalize">
                          {cat}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {Array.isArray(items)
                              ? items.map((it) => (
                                  <div
                                    key={it._key}
                                    className="flex justify-between"
                                  >
                                    <div className="text-sm text-muted-foreground">
                                      {it.feature}
                                    </div>
                                    <div className="text-sm font-medium">
                                      {it.value}
                                    </div>
                                  </div>
                                ))
                              : null}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}
