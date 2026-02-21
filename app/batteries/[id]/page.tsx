import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BATTERY_BY_ID } from "@/sanity/lib/queries";
import type { Battery } from "@/sanity.types";
import BackButton from "@/components/General/BackButton";
import QuoteRequestButton from "@/components/General/QuoteRequestButton";

type Props = {
  params: { id: string };
};

export default async function BatteryPage({ params }: Props) {
  const { id } = (await params) as { id?: string };

  if (!id) {
    return <div className="p-8">Battery not found.</div>;
  }

  let batteryToRender: Battery | null = null;
  let fetchError: Error | null = null;
  let notFound = false;

  try {
    const battery = await client.fetch<Battery | null>(BATTERY_BY_ID, {
      id,
    });

    if (!battery) {
      notFound = true;
    } else {
      batteryToRender = battery;
    }
  } catch (err) {
    console.error("BatteryPage: error fetching battery", { err, id });
    fetchError = (err as Error) ?? new Error(String(err));
  }

  if (fetchError) {
    return (
      <div className="p-8">
        <h2 className="text-lg font-semibold">Error loading battery</h2>
        <p className="text-sm text-muted-foreground mt-2">
          {fetchError.message ?? String(fetchError)}
        </p>
      </div>
    );
  }

  if (notFound) {
    return <div className="p-8">Battery not found.</div>;
  }

  if (batteryToRender) {
    return renderBattery(batteryToRender);
  }

  return <div className="p-8">Battery not found.</div>;

  function renderBattery(battery: Battery) {
    const bannerUrl = battery.banner
      ? urlFor(battery.banner).auto("format").url()
      : null;
    const imageUrl = battery.image
      ? urlFor(battery.image).auto("format").url()
      : null;

    return (
      <div className="min-h-screen">
        {/* Banner / Hero */}
        {bannerUrl ? (
          <div className="w-full bg-amber-400 relative flex items-end">
            <Image
              src={bannerUrl}
              alt="battery banner"
              width={0}
              height={0}
              unoptimized
              className="h-full w-full"
            />
            <BackButton className="bg-white/20 absolute top-4 left-4 z-20" />
            <h1 className="text-4xl sm:text-6xl absolute font-bold text-white px-6 py-3 rounded">
              {battery.brand}
            </h1>
          </div>
        ) : (
          <div className="w-full bg-linear-to-r from-primary/10 to-primary/5 py-8 px-6">
            <div className="max-w-6xl mx-auto">
              <BackButton className="mb-4" />
              <h1 className="text-3xl sm:text-4xl font-bold">
                {battery.brand}
              </h1>
              {battery.name && (
                <p className="text-muted-foreground mt-1">{battery.name}</p>
              )}
            </div>
          </div>
        )}

        {/* Name + image */}
        <div className="max-w-7xl grid sm:grid-cols-2 items-center grid-cols-1 mx-auto px-6 py-12">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              {battery.brand}
              {battery.name ? ` – ${battery.name}` : ""}
            </h2>
            <QuoteRequestButton
              productName={battery.brand || battery.name || "Battery"}
              productType="battery"
              className="mt-6"
            />
          </div>
          {imageUrl && (
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src={imageUrl}
                  alt={battery.name ?? battery.brand ?? "battery"}
                  fill
                  unoptimized
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        {battery.features && battery.features.length > 0 && (
          <section className="max-w-6xl mt-8 mx-auto px-6 py-6">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6">
              Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {battery.features.map((feature) => (
                <div
                  key={feature._key}
                  className="bg-card max-w-110 rounded overflow-hidden border"
                >
                  {feature.images != null && (
                    <div className="relative w-full h-48 sm:h-56 md:h-64">
                      <Image
                        src={urlFor(feature.images).auto("format").url()}
                        alt={feature.title ?? battery.brand ?? "feature"}
                        fill
                        unoptimized
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    {feature.title && (
                      <h4 className="font-medium text-lg mb-2">
                        {feature.title}
                      </h4>
                    )}
                    {feature.details && feature.details.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {feature.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
}
