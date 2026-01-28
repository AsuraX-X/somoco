"use client";

import { useState, useEffect, useMemo } from "react";
import { client } from "@/sanity/lib/client";
import { ALL_DEALERS } from "@/sanity/lib/queries";
import type { Dealer } from "@/sanity.types";
import { DealerSection } from "@/components/WhereToBuy/DealerSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Store, Wrench, Shield, Package } from "lucide-react";

export default function WhereToBuyPage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Fetch all dealers on mount
  useEffect(() => {
    async function fetchDealers() {
      try {
        const data = await client.fetch<Dealer[]>(ALL_DEALERS);
        setDealers(data);
      } catch (error) {
        console.error("Error fetching dealers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDealers();
  }, []);

  // Get unique regions (filter out undefined)
  const regions = useMemo(() => {
    const uniqueRegions = Array.from(
      new Set(
        dealers
          .map((d) => d.region)
          .filter((r): r is string => typeof r === "string" && r.trim() !== "")
      )
    );
    return uniqueRegions.sort();
  }, [dealers]);

  // Get cities for selected region (filter out undefined)
  const cities = useMemo(() => {
    if (!selectedRegion || selectedRegion === "all") return [];
    const regionCities = dealers
      .filter((d) => d.region === selectedRegion)
      .map((d) => d.city)
      .filter((c): c is string => typeof c === "string" && c.trim() !== "");
    return Array.from(new Set(regionCities)).sort();
  }, [dealers, selectedRegion]);

  // Filter dealers by location ("all" means no filter)
  const filteredDealers = useMemo(() => {
    let filtered = dealers;

    if (selectedRegion && selectedRegion !== "all") {
      filtered = filtered.filter((d) => d.region === selectedRegion);
    }

    if (selectedCity && selectedCity !== "all") {
      filtered = filtered.filter((d) => d.city === selectedCity);
    }

    return filtered;
  }, [dealers, selectedRegion, selectedCity]);

  // Group dealers by type
  const partnerDealers = filteredDealers.filter(
    (d) => d.type === "partner_dealer",
  );
  const sparesDealers = filteredDealers.filter(
    (d) => d.type === "spares_dealer",
  );
  const servicePartners = filteredDealers.filter(
    (d) => d.type === "service_partner",
  );
  const warrantyTouchpoints = filteredDealers.filter(
    (d) => d.type === "warranty_touchpoint",
  );

  // Reset city when region changes
  useEffect(() => {
    setSelectedCity("");
  }, [selectedRegion]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Where to Buy</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find authorized Somoco dealers, service partners, and warranty touch
          points near you.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-lg p-6 mb-12">
        <h2 className="text-xl font-semibold mb-4">Filter by Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Region Select */}
          <div className="w-full">
            <Label htmlFor="region" className="mb-2 block">
              Region
            </Label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full" id="region">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Select */}
          <div className="w-full">
            <Label htmlFor="city" className="mb-2 block">
              City
            </Label>
            <Select
              value={selectedCity}
              onValueChange={setSelectedCity}
              disabled={!selectedRegion || selectedRegion === "all"}
            >
              <SelectTrigger className="w-full" id="city">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Clear Filters */}
        {((selectedRegion && selectedRegion !== "all") || (selectedCity && selectedCity !== "all")) && (
          <button
            onClick={() => {
              setSelectedRegion("");
              setSelectedCity("");
            }}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredDealers.length} result
          {filteredDealers.length !== 1 ? "s" : ""}
          {selectedRegion && selectedRegion !== "all" && (
            <span>
              {" "}
              in{" "}
              {selectedCity && selectedCity !== "all"
                ? `${selectedCity}, `
                : ""}
              {selectedRegion}
            </span>
          )}
        </p>
      </div>

      {/* Dealer Sections */}
      <div>
        <DealerSection
          title="Partner Dealers"
          dealers={partnerDealers}
          icon={<Store className="w-8 h-8" />}
        />

        <DealerSection
          title="Spares Dealers"
          dealers={sparesDealers}
          icon={<Package className="w-8 h-8" />}
        />

        <DealerSection
          title="Service Partners"
          dealers={servicePartners}
          icon={<Wrench className="w-8 h-8" />}
        />

        <DealerSection
          title="Warranty Touch Points"
          dealers={warrantyTouchpoints}
          icon={<Shield className="w-8 h-8" />}
        />
      </div>

      {/* No Results */}
      {filteredDealers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No dealers found in the selected location.
          </p>
          <p className="text-gray-400 mt-2">
            Try selecting a different region or city.
          </p>
        </div>
      )}
    </div>
  );
}
