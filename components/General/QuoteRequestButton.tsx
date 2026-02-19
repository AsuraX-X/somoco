"use client";

import { Button } from "@/components/ui/button";
import { useQuoteRequest } from "./QuoteRequestContext";

interface QuoteRequestButtonProps {
  productName: string;
  productType: "vehicle" | "tyre" | "battery";
  className?: string;
}

export default function QuoteRequestButton({
  productName,
  productType,
  className,
}: QuoteRequestButtonProps) {
  const { openQuoteForm } = useQuoteRequest();

  return (
    <Button
      size="lg"
      className={className}
      onClick={() => openQuoteForm(productName, productType)}
    >
      Request Quote
    </Button>
  );
}
