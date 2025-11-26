"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type VehicleOption = { _id: string; name?: string };

export default function OrderForm() {
  const [vehicles, setVehicles] = useState<VehicleOption[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleId, setVehicleId] = useState<string | undefined>(undefined);
  const [mileage, setMileage] = useState("");
  const [requestedParts, setRequestedParts] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    client
      .fetch<VehicleOption[]>(`*[_type == "vehicle"]{ _id, name }`)
      .then((res) => {
        if (!mounted) return;
        setVehicles(res || []);
        if (res?.length) setVehicleId(res[0]._id);
      })
      .catch(() => {
        if (!mounted) return;
        setVehicles([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !email || !phone || !vehicleId || !requestedParts || !agree) {
      setError("Please fill required fields and accept the agreement.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        email,
        phone,
        vehicleId,
        mileage,
        requestedParts,
        agree,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/spare-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json?.ok) {
        setSuccess(
          "Order received. We'll contact you with availability and pricing."
        );
        setName("");
        setEmail("");
        setPhone("");
        setMileage("");
        setRequestedParts("");
        setAgree(false);
      } else {
        setError(json?.error ?? "Failed to submit. Please try again later.");
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="max-w-3xl mx-auto space-y-6" onSubmit={handleSubmit}>
      <Field>
        <FieldLabel>
          <Label>Name *</Label>
        </FieldLabel>
        <FieldContent>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
          />
        </FieldContent>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field>
          <FieldLabel>
            <Label>Email *</Label>
          </FieldLabel>
          <FieldContent>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>
            <Label>Phone *</Label>
          </FieldLabel>
          <FieldContent>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              required
            />
          </FieldContent>
        </Field>
      </div>

      <Field>
        <FieldLabel>
          <Label>Vehicle *</Label>
        </FieldLabel>
        <FieldContent>
          <Select value={vehicleId} onValueChange={(v) => setVehicleId(v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select vehicle" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              {vehicles.map((v) => (
                <SelectItem key={v._id} value={v._id}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>
          <Label>Current mileage</Label>
        </FieldLabel>
        <FieldContent>
          <Input
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            placeholder="e.g. 12,000 km"
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>
          <Label>Requested spare part(s) *</Label>
        </FieldLabel>
        <FieldContent>
          <Textarea
            value={requestedParts}
            onChange={(e) => setRequestedParts(e.target.value)}
            placeholder="List the parts you need, include part numbers if available"
            required
          />
        </FieldContent>
      </Field>

      <div className="flex items-start gap-3">
        <Checkbox
          checked={agree}
          onCheckedChange={(v) => setAgree(Boolean(v))}
        />
        <div>
          <div className="md:text-sm text-xs">
            By submitting this form you confirm you want to order these spare
            parts and agree to be contacted regarding your order.
          </div>
        </div>
      </div>

      {error && <div className="text-destructive text-sm">{error}</div>}
      {success && <div className="text-success text-sm">{success}</div>}

      <div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending…" : "Place Order"}
        </Button>
      </div>
    </form>
  );
}
