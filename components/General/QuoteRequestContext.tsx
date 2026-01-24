"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface QuoteRequestContextType {
  isOpen: boolean;
  productName: string;
  productType: "vehicle" | "tyre";
  openQuoteForm: (productName: string, productType: "vehicle" | "tyre") => void;
  closeQuoteForm: () => void;
}

const QuoteRequestContext = createContext<QuoteRequestContextType | null>(null);

export function QuoteRequestProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState<"vehicle" | "tyre">("vehicle");

  const openQuoteForm = (name: string, type: "vehicle" | "tyre") => {
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
