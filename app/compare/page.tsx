"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { VEHICLE_BY_ID, ALL_VEHICLES } from "@/sanity/lib/queries";
import CompareTable from "@/components/Compare/CompareTable";
import VehiclePicker from "@/components/Compare/VehiclePicker";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import BackButton from "@/components/General/BackButton";
// urlFor is not needed on the compare page

type Vehicle = {
  _id: string;
  name?: string;
  engine?: string;
  horsepower?: string;
  capacity?: string;
  torque?: string;
  description?: string;
  technicalFeatures?: {
    performance?: { feature: string; value: string }[];
    drivetrain?: { feature: string; value: string }[];
    suspension?: { feature: string; value: string }[];
    brakes?: { feature: string; value: string }[];
  };
  image?: unknown;
};

function ComparePageContent() {
  const params = useSearchParams();
  const router = useRouter();
  const v1Id = params?.get("v1") ?? undefined;
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [v1, setV1] = useState<Vehicle | null>(null);
  const [v2Id, setV2Id] = useState<string | undefined>(
    params?.get("v2") ?? undefined
  );
  const [v2, setV2] = useState<Vehicle | null>(null);

  useEffect(() => {
    client.fetch<Vehicle[]>(ALL_VEHICLES).then((res) => setVehicles(res || []));
  }, []);

  useEffect(() => {
    if (!v1Id) return;
    client
      .fetch<Vehicle>(VEHICLE_BY_ID, { id: v1Id })
      .then((doc) => setV1(doc || null));
  }, [v1Id]);

  useEffect(() => {
    if (!v2Id) return;
    client
      .fetch<Vehicle>(VEHICLE_BY_ID, { id: v2Id })
      .then((doc) => setV2(doc || null));
  }, [v2Id]);

  const setQueryParam = (key: string, value?: string) => {
    const q = new URLSearchParams(params?.toString() ?? "");
    if (value) q.set(key, value);
    else q.delete(key);
    router.push(`/compare?${q.toString()}`);
  };

  const handleSelectV2 = (id: string) => {
    setQueryParam("v2", id);
    setV2Id(id);
  };

  const handleSelectV1 = (id: string) => {
    setQueryParam("v1", id);
  };

  const handleRemoveV1 = () => {
    setQueryParam("v1");
    setV1(null);
  };

  const handleRemoveV2 = () => {
    setQueryParam("v2");
    setV2(null);
    setV2Id(undefined);
  };

  const clear = () => {
    router.push(`/compare`); // clear v1 selection
    setV1(null);
    setV2(null);
  };

  const handleView = (id: string) => {
    if (id) router.push(`/products/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <BackButton className="border mb-5" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Compare vehicles</h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => clear()}>
            Clear
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="w-full">
          <h3 className="font-medium mb-2">Vehicle 1</h3>
          {v1 ? (
            <div className="p-4 border relative rounded-md">
              <div className="mb-2 font-semibold">{v1.name}</div>
              <div className="text-sm text-muted-foreground">{v1.engine}</div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRemoveV1}
                className="absolute top-4 right-4"
              >
                <Trash />
              </Button>
              <Button
                className="mt-4 flex-1"
                onClick={() => handleView(v1._id)}
              >
                View Details
              </Button>
            </div>
          ) : (
            <div className="p-4 border rounded-md text-sm text-muted-foreground">
              <VehiclePicker
                vehicles={vehicles}
                onSelect={handleSelectV1}
                title="Pick Vehicle 1"
              />
            </div>
          )}
        </div>

        <div className="w-full">
          <h3 className="font-medium mb-2">Vehicle 2</h3>
          {v2 ? (
            <div className="p-4 relative border rounded-md">
              <div className="mb-2 font-semibold">{v2.name}</div>
              <div className="text-sm text-muted-foreground">{v2.engine}</div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRemoveV2}
                className="absolute top-4 right-4"
              >
                <Trash />
              </Button>
              <Button
                className="mt-4 flex-1"
                onClick={() => handleView(v2._id)}
              >
                View Details
              </Button>
            </div>
          ) : (
            <div className="p-4 border rounded-md text-sm text-muted-foreground">
              <VehiclePicker
                vehicles={vehicles}
                onSelect={handleSelectV2}
                title="Pick Vehicle 2"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <CompareTable v1={v1} v2={v2} />
      </div>
    </div>
  );
}

const ComparePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComparePageContent />
    </Suspense>
  );
};

export default ComparePage;
