"use client";

import { useState } from "react";
import type { Dealer, ServicePartner } from "@/sanity.types";
import { DealerCard } from "./DealerCard";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DealerSectionProps {
  title: string;
  dealers: (Dealer | ServicePartner)[];
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

export function DealerSection({
  title,
  dealers,
  icon,
  defaultOpen = false,
}: DealerSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          <span className="text-sm text-gray-500">({dealers.length})</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isOpen &&
        (dealers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {dealers.map((dealer) => (
              <DealerCard key={dealer._id} dealer={dealer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg mt-4">
            <p className="text-gray-500">
              No {title.toLowerCase()} found in this location.
            </p>
          </div>
        ))}
    </section>
  );
}
