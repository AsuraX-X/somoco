"use client";

import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// urlFor not required in the picker

type Vehicle = {
  _id: string;
  name?: string;
  type?: string;
  image?: unknown;
  engine?: string;
  horsepower?: string;
};

type Props = {
  vehicles: Vehicle[];
  onSelect: (id: string) => void;
  title?: string;
};

export default function VehiclePicker({
  vehicles,
  onSelect,
  title = "Select vehicle",
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  const types = useMemo(() => {
    const s = new Set<string>();
    vehicles.forEach((v) => v.type && s.add(v.type));
    return Array.from(s);
  }, [vehicles]);

  const filtered = vehicles.filter((v) => {
    if (typeFilter && v.type !== typeFilter) return false;
    if (!query) return true;
    return (v.name || "").toLowerCase().includes(query.toLowerCase());
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{title}</Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[800px] min-w-screen rounded-none md:rounded-lg z-100 h-screen md:h-140 overflow-hidden p-0">
        <DialogHeader className="p-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Filter by type or search to find a vehicle.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3">
          <div className="p-4 border-r h-fit border-border bg-card">
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Search vehicles"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex flex-col gap-2">
                <Button
                  variant={typeFilter ? "ghost" : "secondary"}
                  onClick={() => setTypeFilter(undefined)}
                >
                  All
                </Button>
                {types.map((t) => (
                  <Button
                    key={t}
                    variant={typeFilter === t ? "default" : "ghost"}
                    onClick={() =>
                      setTypeFilter((prev) => (prev === t ? undefined : t))
                    }
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto no-scrollbar max-h-[70vh]">
              {filtered.map((v) => (
                <Card
                  key={v._id}
                  className="cursor-pointer"
                  onClick={() => {
                    onSelect(v._id);
                    setOpen(false);
                  }}
                >
                  <CardHeader>
                    <CardTitle>{v.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {v.engine}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {v.horsepower}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
