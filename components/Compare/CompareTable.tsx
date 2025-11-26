"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type VehicleSpec = {
  _id?: string;
  name?: string;
  engine?: string;
  horsepower?: string;
  torque?: string;
  capacity?: string;
  description?: string;
  technicalFeatures?: {
    performance?: { feature: string; value: string }[];
    drivetrain?: { feature: string; value: string }[];
    suspension?: { feature: string; value: string }[];
    brakes?: { feature: string; value: string }[];
  };
};

type Props = {
  v1?: VehicleSpec | null;
  v2?: VehicleSpec | null;
};

function fmt(val: unknown) {
  if (val == null) return "—";
  if (Array.isArray(val)) return val.join("; ");
  return String(val);
}

export default function CompareTable({ v1, v2 }: Props) {
  const rows: Array<{
    type: "header" | "row";
    data: [string, string, string];
  }> = [
    { type: "row", data: ["Name", fmt(v1?.name), fmt(v2?.name)] },
    { type: "row", data: ["Engine", fmt(v1?.engine), fmt(v2?.engine)] },
    {
      type: "row",
      data: ["Horsepower", fmt(v1?.horsepower), fmt(v2?.horsepower)],
    },
    { type: "row", data: ["Torque", fmt(v1?.torque), fmt(v2?.torque)] },
    { type: "row", data: ["Capacity", fmt(v1?.capacity), fmt(v2?.capacity)] },
  ];

  // Add technical features subcategories
  const subcategories = [
    { key: "performance", label: "Performance" },
    { key: "drivetrain", label: "Drivetrain" },
    { key: "suspension", label: "Suspension" },
    { key: "brakes", label: "Brakes" },
  ] as const;

  subcategories.forEach(({ key, label }) => {
    const v1Features = v1?.technicalFeatures?.[key] || [];
    const v2Features = v2?.technicalFeatures?.[key] || [];
    const allFeatures = new Set([
      ...v1Features.map((f) => f.feature),
      ...v2Features.map((f) => f.feature),
    ]);

    if (allFeatures.size > 0) {
      rows.push({ type: "header", data: [label, "", ""] });
      allFeatures.forEach((feature) => {
        const v1Val =
          v1Features.find((f) => f.feature === feature)?.value || "—";
        const v2Val =
          v2Features.find((f) => f.feature === feature)?.value || "—";
        rows.push({ type: "row", data: [feature, v1Val, v2Val] });
      });
    }
  });

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>
          Values show &quot;&mdash;&quot; when the specification isn&apos;t
          present on a vehicle.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <th className="text-left p-2 bg-muted/20">Spec</th>
            <th className="text-left p-2 bg-muted/10">Vehicle 1</th>
            <th className="text-left p-2 bg-muted/10">Vehicle 2</th>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, idx) => {
            if (r.type === "header") {
              return (
                <TableRow key={`header-${idx}`}>
                  <TableCell
                    colSpan={3}
                    className="font-bold bg-muted/20 text-left py-2"
                  >
                    {r.data[0]}
                  </TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow key={r.data[0]}>
                <TableCell className="font-medium whitespace-normal">
                  {r.data[0]}
                </TableCell>
                <TableCell className="whitespace-normal">{r.data[1]}</TableCell>
                <TableCell className="whitespace-normal">{r.data[2]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
