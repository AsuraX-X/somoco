"use client";

import type { Dealer } from "@/sanity.types";
import { DealerCard } from "./DealerCard";

interface DealerSectionProps {
  title: string;
  dealers: Dealer[];
  icon?: React.ReactNode;
}

export function DealerSection({ title, dealers, icon }: DealerSectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        {icon && <div className="text-primary">{icon}</div>}
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>

      {dealers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealers.map((dealer) => (
            <DealerCard key={dealer._id} dealer={dealer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No {title.toLowerCase()} found in this location.
          </p>
        </div>
      )}
    </section>
  );
}
