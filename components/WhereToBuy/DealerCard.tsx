"use client";

import { Card } from "@/components/ui/card";
import type { Dealer } from "@/sanity.types";
import { MapPin, Phone, Mail } from "lucide-react";

interface DealerCardProps {
  dealer: Dealer;
}

export function DealerCard({ dealer }: DealerCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{dealer.name}</h3>

      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
          <div>
            <p>{dealer.address}</p>
            <p className="text-xs text-gray-500 mt-1">
              {dealer.city}, {dealer.region}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 shrink-0 text-primary" />
          <a
            href={`tel:${dealer.contactNumber}`}
            className="hover:text-primary transition-colors"
          >
            {dealer.contactNumber}
          </a>
        </div>

        {dealer.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 shrink-0 text-primary" />
            <a
              href={`mailto:${dealer.email}`}
              className="hover:text-primary transition-colors"
            >
              {dealer.email}
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
