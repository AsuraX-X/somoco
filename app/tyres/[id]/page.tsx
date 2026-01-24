import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { TYRE_BY_ID } from "@/sanity/lib/queries";
import type { Tyres } from "@/sanity.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import BackButton from "@/components/General/BackButton";
import QuoteRequestButton from "@/components/General/QuoteRequestButton";

type Props = {
  params: { id: string };
};

function plainTextFromBlocks(blocks?: Tyres["description"]) {
  if (!blocks) return null;
  return blocks
    .map((blk) => {
      const children = blk?.children ?? [];
      return children.map((c) => c?.text ?? "").join("");
    })
    .join("\n\n");
}

export default async function TyrePage({ params }: Props) {
  // In Next.js App Router, `params` can be a Promise depending on usage.
  const { id } = (await params) as { id?: string };
  // Defensive check: return a safe not-found UI when id is missing.
  if (!id) {
    return <div className="p-8">Tyre not found.</div>;
  }

  // Do not construct JSX inside try/catch — collect plain data/state and render after the try/catch.
  let tyreToRender: Tyres | null = null;
  let fetchError: Error | null = null;
  let notFound = false;

  try {
    const tyre = await client.fetch<Tyres | null>(TYRE_BY_ID, { id });

    if (!tyre) {
      notFound = true;
    } else {
      tyreToRender = tyre;
    }
  } catch (err) {
    // Log full error server-side to aid debugging (avoid exposing stack to users)
    console.error("TyrePage: error fetching tyre", { err, id });
    fetchError = (err as Error) ?? new Error(String(err));
  }

  // Render after try/catch (no JSX inside try/catch)
  if (fetchError) {
    return (
      <div className="p-8">
        <h2 className="text-lg font-semibold">Error loading tyre</h2>
        <p className="text-sm text-muted-foreground mt-2">
          {fetchError.message ?? String(fetchError)}
        </p>
      </div>
    );
  }

  if (notFound) {
    return <div className="p-8">Tyre not found.</div>;
  }

  if (tyreToRender) {
    return renderTyre(tyreToRender);
  }

  // Fallback if nothing matched (safe default)
  return <div className="p-8">Tyre not found.</div>;

  // Extracted small renderer so we can return early from the try/catch branches above
  function renderTyre(tyre: Tyres) {
    const header1 = tyre.headerImage1
      ? urlFor(tyre.headerImage1).width(1600).height(600).url()
      : undefined;
    const header2 = tyre.headerImage2
      ? urlFor(tyre.headerImage2).width(1200).height(400).url()
      : undefined;

    const description = plainTextFromBlocks(tyre.description);

    type ImgType =
      | NonNullable<Tyres["images"]>[number]
      | NonNullable<Tyres["gallery"]>[number]["image"];
    const imagesToShow: ImgType[] =
      tyre.images && tyre.images.length
        ? tyre.images
        : (tyre.gallery?.map((g) => g.image) ?? []);

    return (
      <div>
        <div
          className="w-full h-[60vh] relative bg-cover bg-center flex items-end p-4"
          style={{ backgroundImage: `url(${header1})` }}
        >
          <BackButton className="bg-white/20 absolute top-4 left-4 z-20" />
          <h1 className="text-4xl sm:text-6xl font-bold text-white px-6 py-3 rounded">
            {tyre.name || tyre.brand}
          </h1>
        </div>

        {/* Name + description */}
        <div className="max-w-7xl grid sm:grid-cols-2 items-center grid-cols-1 mx-auto px-6 py-12">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              {tyre.name || tyre.brand}
            </h2>
            {description ? (
              <p className="prose text-base text-muted-foreground">
                {description}
              </p>
            ) : null}

            {/* Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-8">
              <div>
                <h4 className="text-sm font-medium">Brand</h4>
                <p className="text-2xl">{tyre.brand ?? "—"}</p>
              </div>
              {tyre.sizes && tyre.sizes.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium">Available Sizes</h4>
                  <div className="mt-2">
                    <ul className="grid grid-cols-2 gap-4 text-sm">
                      {tyre.sizes.map((size) => (
                        <li key={size} className="leading-tight text-lg">
                          {size}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <QuoteRequestButton
              productName={tyre.name || tyre.brand || "Tyre"}
              productType="tyre"
              className="mt-6"
            />
          </div>
          <div>
            {(tyre.images?.length || tyre.gallery?.length) && (
              <section className="max-w-6xl mx-auto px-6 py-12">
                <Carousel opts={{ loop: true }} className="relative">
                  <CarouselContent className="">
                    {imagesToShow.map((img, idx) => (
                      <CarouselItem key={idx}>
                        {img ? (
                          <div className="rounded">
                            <div className="relative w-full h-70 sm:h-90 md:h-112.5">
                              <Image
                                src={urlFor(img).auto("format").url()}
                                alt={tyre.name ?? tyre.brand ?? "tyre image"}
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
                  {imagesToShow.length > 1 && (
                    <>
                      <CarouselPrevious className="sm:absolute flex top-1/2 ml-4 sm:ml-0 sm:left-4 scale-125 cursor-pointer" />
                      <CarouselNext className="sm:absolute flex top-1/2 mr-4 sm:mr-0 sm:right-4 scale-125 cursor-pointer" />
                    </>
                  )}
                </Carousel>
              </section>
            )}
          </div>
        </div>

        {header2 && (
          <div className="w-full max-w-5xl mx-auto mt-6">
            <Image
              src={header2}
              alt={`${tyre.name || tyre.brand} header 2`}
              width={0}
              height={0}
              unoptimized
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Gallery */}
        {tyre.gallery && tyre.gallery.length > 0 && (
          <section className="max-w-6xl mt-20 mx-auto px-6 py-12">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6">
              Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tyre.gallery.map((g) => (
                <div
                  key={g._key}
                  className="bg-card max-w-110 rounded overflow-hidden"
                >
                  {g.image && (
                    <div className="relative w-full h-48 sm:h-56 md:h-64">
                      <Image
                        src={urlFor(g.image).auto("format").url()}
                        alt={g.title ?? tyre.name ?? tyre.brand ?? "gallery"}
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

        {/* Features (listed under the gallery) */}
        {tyre.features && tyre.features.length > 0 && (
          <section className="max-w-6xl mt-8 mx-auto px-6 py-6">
            <h3 className="text-2xl font-semibold mb-4">Technical Features</h3>
            <div className="grid grid-cols-1 gap-2">
              {tyre.features.map((feature, idx) => (
                <div key={idx} className="flex justify-between border-b pb-2">
                  <div className="text-sm text-muted-foreground">
                    {feature.feature}
                  </div>
                  <div className="text-sm font-medium">{feature.value}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
}
