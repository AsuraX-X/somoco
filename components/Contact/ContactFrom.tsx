"use client";

import React, { useState } from "react";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !email || !phone || !city || !region || !message || !agree) {
      setError("Please fill all required fields and accept the agreement.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        email,
        phone,
        city,
        region,
        message,
        agree,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json?.ok) {
        setSuccess("Message sent successfully. We will get back to you soon.");
        setName("");
        setEmail("");
        setPhone("");
        setCity("");
        setRegion("");
        setMessage("");
        setAgree(false);
      } else {
        setError(
          json?.error ?? "Failed to send message. Please try again later."
        );
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field>
          <FieldLabel>
            <Label>City *</Label>
          </FieldLabel>
          <FieldContent>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City name"
              required
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>
            <Label>Region *</Label>
          </FieldLabel>
          <FieldContent>
            <Input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Region name"
              required
            />
          </FieldContent>
        </Field>
      </div>

      <Field>
        <FieldLabel>
          <Label>Message *</Label>
        </FieldLabel>
        <FieldContent>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
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
            By submitting this form you agree to be contacted regarding your
            inquiry.
          </div>
        </div>
      </div>

      {error && <div className="text-destructive text-sm">{error}</div>}
      {success && <div className="text-success text-sm">{success}</div>}

      <div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending…" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
