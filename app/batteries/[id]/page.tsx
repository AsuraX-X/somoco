import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BATTERY_BY_ID } from "@/sanity/lib/queries";
import BackButton from "@/components/General/BackButton";
import QuoteRequestButton from "@/components/General/QuoteRequestButton";

type BatteryData = {
  _id: string;
  name?: string;
  brand?: string;
  image?: unknown;
  features?: Array<{
    _key: string;
    title?: string;
    details?: string[];
  }>;
};

type Props = {
  params: { id: string };
};

export default async function BatteryPage({ params }: Props) {
  const { id } = (await params) as { id?: string };

  if (!id) {
    return <div className="p-8">Battery not found.</div>;
  }

  let batteryToRender: BatteryData | null = null;
  let fetchError: Error | null = null;
  let notFound = false;

  try {
    const battery = await client.fetch<BatteryData | null>(BATTERY_BY_ID, {
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

  function renderBattery(battery: BatteryData) {
    const imageUrl = battery.image
      ? urlFor(battery.image).auto("format").url()
      : null;

    return (
      <div className="min-h-screen">
        {/* Header */}
        <div className="w-full bg-linear-to-r from-primary/10 to-primary/5 py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <BackButton className="mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold">{battery.brand}</h1>
            {battery.name && (
              <p className="text-muted-foreground mt-1">{battery.name}</p>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="flex justify-center">
              {imageUrl ? (
                <div className="relative w-full max-w-md aspect-square">
                  <Image
                    src={imageUrl}
                    alt={battery.name ?? battery.brand ?? "battery"}
                    fill
                    unoptimized
                    className="object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full max-w-md aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                {battery.brand}
                {battery.name ? ` – ${battery.name}` : ""}
              </h2>
              <QuoteRequestButton
                productName={battery.brand || battery.name || "Battery"}
                productType="battery"
                className="mb-8"
              />

              {/* Features */}
              {battery.features && battery.features.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Features</h3>
                  {battery.features.map((feature) => (
                    <div
                      key={feature._key}
                      className="bg-card border rounded-lg p-4"
                    >
                      {feature.title && (
                        <h4 className="font-medium text-lg mb-2">
                          {feature.title}
                        </h4>
                      )}
                      {feature.details && feature.details.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {feature.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
