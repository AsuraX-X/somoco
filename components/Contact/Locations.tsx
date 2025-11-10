import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, Phone } from "lucide-react";
import locations from "./locations";

const Locations = () => {
  return (
    <div className="mt-10 border-y px-4 pt-20 pb-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Locations</h2>
        <Accordion type="single" collapsible className="w-full">
          {locations.map((location, index) => (
            <AccordionItem key={index} value={`location-${index}`}>
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex flex-col items-start gap-2">
                  <h3 className="text-lg font-semibold">{location.place}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="shrink-0" />
                      <a
                        href={location.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {location.address}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="shrink-0" />
                      <a
                        href={`tel:${location.phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="w-full">
                  <div className="w-full rounded-md overflow-hidden border">
                    <iframe
                      src={location.map}
                      className="w-full h-64"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${location.place}`}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Locations;
