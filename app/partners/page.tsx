"use client";

import { useState, useEffect, useMemo } from "react";
import { client } from "@/sanity/lib/client";
import { ALL_DEALERS } from "@/sanity/lib/queries";
import type { Dealer, ServicePartner } from "@/sanity.types";
import { DealerSection } from "@/components/WhereToBuy/DealerSection";
import { WhereToBuyTutorial } from "@/components/WhereToBuy/PartnersTutorial";
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
  const [dealers, setDealers] = useState<(Dealer | ServicePartner)[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Fetch all dealers and service partners on mount
  useEffect(() => {
    async function fetchDealers() {
      try {
        const data =
          await client.fetch<(Dealer | ServicePartner)[]>(ALL_DEALERS);
        setDealers(data);
      } catch (error) {
        console.error("Error fetching dealers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDealers();
  }, []);

  // Get unique regions (flatten arrays and filter out undefined)
  const regions = useMemo(() => {
    const allRegions = dealers.flatMap((d) => d.regions || []);
    const uniqueRegions = Array.from(
      new Set(
        allRegions.filter((r) => typeof r === "string" && r.trim() !== ""),
      ),
    );
    return uniqueRegions.sort();
  }, [dealers]);

  // Get locations for selected region (flatten arrays and filter)
  const locations = useMemo(() => {
    if (!selectedRegion) return [];
    const regionDealers = dealers.filter((d) =>
      d.regions?.includes(selectedRegion),
    );
    const allLocations = regionDealers.flatMap((d) => d.towns || []);
    return Array.from(
      new Set(
        allLocations.filter((t) => typeof t === "string" && t.trim() !== ""),
      ),
    ).sort();
  }, [dealers, selectedRegion]);

  // Filter dealers by location - only show dealers if a region is selected
  const filteredDealers = useMemo(() => {
    // Don't show any dealers if no region is selected
    if (!selectedRegion) {
      return [];
    }

    let filtered = dealers.filter((d) => d.regions?.includes(selectedRegion));

    if (selectedLocation && selectedLocation !== "all") {
      filtered = filtered.filter((d) => d.towns?.includes(selectedLocation));
    }

    return filtered;
  }, [dealers, selectedRegion, selectedLocation]);

  // Group dealers by type
  const partnerDealers = filteredDealers.filter(
    (d) => d.type === "partner_dealer",
  );
  const tyresBatteriesDealers = filteredDealers.filter(
    (d) => d.type === "tyres_batteries_dealer",
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

  // Reset location when region changes
  useEffect(() => {
    setSelectedLocation("");
  }, [selectedRegion]);

  if (loading) {
    return (
      <div className="container h-screen place-content-center mx-auto px-4 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen mx-auto px-4 py-12">
      {/* Tutorial/Help Component */}
      <WhereToBuyTutorial />

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Partners</h1>
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
              <SelectContent className="bg-background z-50">
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Select */}
          <div className="w-full">
            <Label htmlFor="location" className="mb-2 block">
              Location
            </Label>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
              disabled={!selectedRegion}
            >
              <SelectTrigger className="w-full" id="location">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedRegion ||
          (selectedLocation && selectedLocation !== "all")) && (
          <button
            onClick={() => {
              setSelectedRegion("");
              setSelectedLocation("");
            }}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results Count */}
      {selectedRegion && (
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDealers.length} result
            {filteredDealers.length !== 1 ? "s" : ""}
            <span>
              {" "}
              in{" "}
              {selectedLocation && selectedLocation !== "all"
                ? `${selectedLocation}, `
                : ""}
              {selectedRegion}
            </span>
          </p>
        </div>
      )}

      {/* Dealer Sections (always rendered so empty categories show collapsed with a (0) count) */}
      <div className="space-y-4">
        <DealerSection
          title="Vehicle Partner Dealers"
          dealers={partnerDealers}
          icon={<Store className="w-6 h-6" />}
          defaultOpen={partnerDealers.length > 0}
        />

        <DealerSection
          title="Tyres & Batteries Dealer Partners"
          dealers={tyresBatteriesDealers}
          icon={<Package className="w-6 h-6" />}
        />

        <DealerSection
          title="Spares Dealers"
          dealers={sparesDealers}
          icon={<Package className="w-6 h-6" />}
        />

        <DealerSection
          title="Service Partners"
          dealers={servicePartners}
          icon={<Wrench className="w-6 h-6" />}
          defaultOpen={
            servicePartners.length > 0 && partnerDealers.length === 0
          }
        />

        <DealerSection
          title="Warranty Touch Points"
          dealers={warrantyTouchpoints}
          icon={<Shield className="w-6 h-6" />}
        />
      </div>

      {/* No Results message (still shown when no dealers match the selected region) */}
      {filteredDealers.length === 0 && selectedRegion && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No locations found in the selected area.
          </p>
          <p className="text-gray-400 mt-2">
            Try selecting a different region or location.
          </p>
        </div>
      )}
    </div>
  );
}
