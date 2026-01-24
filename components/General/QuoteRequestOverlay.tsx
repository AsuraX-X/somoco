"use client";

import { useState } from "react";
import { useQuoteRequest } from "./QuoteRequestContext";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function QuoteRequestOverlay() {
  const { isOpen, productName, productType, closeQuoteForm } =
    useQuoteRequest();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    city: "",
    region: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Update product field when productName changes
  const currentProduct = formData.product || productName;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.region
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        product: currentProduct,
        productType,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json?.ok) {
        setSuccess("Quote request sent! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          product: "",
          city: "",
          region: "",
          message: "",
        });
        // Auto-close after 2 seconds on success
        setTimeout(() => {
          closeQuoteForm();
          setSuccess(null);
        }, 2000);
      } else {
        setError(
          json?.error ?? "Failed to send request. Please try again later.",
        );
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    closeQuoteForm();
    setSuccess(null);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Request Quote</h2>
              <p className="text-sm text-muted-foreground">
                Get a personalized quote for this {productType}. We&apos;ll get
                back to you soon.
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              ✕
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your full name"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your@email.com"
                />
              </Field>

              <Field>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Your phone number"
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor="product">Product</Label>
              <Input
                id="product"
                type="text"
                value={currentProduct}
                onChange={(e) => handleChange("product", e.target.value)}
                placeholder="Product name"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Your city"
                />
              </Field>

              <Field>
                <Label htmlFor="region">Region *</Label>
                <Input
                  id="region"
                  type="text"
                  required
                  value={formData.region}
                  onChange={(e) => handleChange("region", e.target.value)}
                  placeholder="Your region/state"
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={3}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Tell us more about your requirements..."
              />
            </Field>

            {error && <div className="text-destructive text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Sending..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
