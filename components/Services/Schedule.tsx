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

interface ScheduleProps {
  selectedService?: string;
}

export default function Schedule({ selectedService }: ScheduleProps) {
  const [vehicles, setVehicles] = useState<VehicleOption[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleId, setVehicleId] = useState<string | undefined>(undefined);
  const [mileage, setMileage] = useState("");
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedService) {
      setNotes(selectedService);
    }
  }, [selectedService]);

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

    if (!name || !email || !phone || !vehicleId || !agree) {
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
        notes,
        agree,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json?.ok) {
        setSuccess(
          "Request received. A service advisor will contact you within 48 hours."
        );
        setName("");
        setEmail("");
        setPhone("");
        setMileage("");
        setNotes("");
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
          <Label>Details</Label>
        </FieldLabel>
        <FieldContent>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe the work or issues you'd like us to check"
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
            By submitting this form you will be scheduling a service appointment
            at no obligation and will be contacted within 48 hours by a service
            advisor.
          </div>
        </div>
      </div>

      {error && <div className="text-destructive text-sm">{error}</div>}
      {success && <div className="text-success text-sm">{success}</div>}

      <div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending…" : "Request a Service"}
        </Button>
      </div>
    </form>
  );
}
