"use client";

import { Card } from "@/components/ui/card";
import type { Dealer, ServicePartner } from "@/sanity.types";
import { MapPin, Phone, Bike } from "lucide-react";

interface DealerCardProps {
  dealer: Dealer | ServicePartner;
}

export function DealerCard({ dealer }: DealerCardProps) {
  // Map vehicle type codes to display names
  const getVehicleTypeDisplay = (vehicleTypes: string[]): string => {
    return vehicleTypes
      .map((type) => {
        switch (type) {
          case "2W":
            return "2 Wheelers";
          case "3W":
            return "3 Wheelers";
          default:
            return type;
        }
      })
      .join(", ");
  };

  // Check if this is a service partner with vehicle types
  const hasVehicleTypes =
    dealer._type === "servicePartner" &&
    "vehicleTypes" in dealer &&
    dealer.vehicleTypes &&
    dealer.vehicleTypes.length > 0;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
      <h3 className="text-xl font-semibold min-h-14 flex items-start">
        {dealer.name}
      </h3>

      <div className="space-y-4 text-sm text-gray-600 grow">
        <div className="flex gap-3">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
          <div className="flex-1 min-w-0">
            <p className="wrap-break-word">{dealer.towns?.join(", ")}</p>
            <p className="text-xs text-gray-500 mt-1 wrap-break-word">
              {dealer.regions?.join(", ")}
            </p>
          </div>
        </div>

        {hasVehicleTypes && (
          <div className="flex gap-3">
            <Bike className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="wrap-break-word">
                {getVehicleTypeDisplay(
                  (dealer as ServicePartner).vehicleTypes!,
                )}
              </p>
            </div>
          </div>
        )}

        {dealer.contactNumbers && dealer.contactNumbers.length > 0 && (
          <div className="flex gap-3">
            <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <div className="flex-1 min-w-0 space-y-1">
              {dealer.contactNumbers.map((number, idx) => (
                <a
                  key={idx}
                  href={`tel:${number}`}
                  className="hover:text-primary transition-colors break-words block"
                >
                  {number}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
