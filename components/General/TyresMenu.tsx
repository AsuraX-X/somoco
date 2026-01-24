"use client";

import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import TypesList from "./TypesList";

export default function TyresMenu({
  types,
  onBack,
  onSelect,
}: {
  types: string[];
  onBack?: () => void;
  onSelect?: () => void;
}) {
  return (
    <motion.ul
      key="tyres"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="flex h-full flex-col gap-4"
    >
      <li>
        <button onClick={() => onBack?.()} className="flex items-center gap-2">
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>
      </li>
      <li className="mt-2">
        <TypesList
          types={types}
          basePath="/tyres"
          paramName="brand"
          onSelect={() => onSelect?.()}
        />
      </li>
    </motion.ul>
  );
}
