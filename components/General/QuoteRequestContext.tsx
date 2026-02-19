"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface QuoteRequestContextType {
  isOpen: boolean;
  productName: string;
  productType: "vehicle" | "tyre" | "battery";
  openQuoteForm: (
    productName: string,
    productType: "vehicle" | "tyre" | "battery",
  ) => void;
  closeQuoteForm: () => void;
}

const QuoteRequestContext = createContext<QuoteRequestContextType | null>(null);

export function QuoteRequestProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState<
    "vehicle" | "tyre" | "battery"
  >("vehicle");

  const openQuoteForm = (
    name: string,
    type: "vehicle" | "tyre" | "battery",
  ) => {
    setProductName(name);
    setProductType(type);
    setIsOpen(true);
  };

  const closeQuoteForm = () => {
    setIsOpen(false);
  };

  return (
    <QuoteRequestContext.Provider
      value={{
        isOpen,
        productName,
        productType,
        openQuoteForm,
        closeQuoteForm,
      }}
    >
      {children}
    </QuoteRequestContext.Provider>
  );
}

export function useQuoteRequest() {
  const context = useContext(QuoteRequestContext);
  if (!context) {
    throw new Error(
      "useQuoteRequest must be used within a QuoteRequestProvider",
    );
  }
  return context;
}
