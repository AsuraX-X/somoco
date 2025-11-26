"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  className?: string;
  label?: string;
};

export default function BackButton({ className, label = "Back" }: Props) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={className}
      onClick={() => router.back()}
      aria-label={label}
    >
      <ArrowLeft />
      <span>{label}</span>
    </Button>
  );
}
