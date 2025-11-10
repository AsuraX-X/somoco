"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "General Automotive Repair",
    content:
      "Comprehensive repairs for all vehicle makes and models, ensuring reliability and safety on the road.",
  },
  {
    title: "Preventative Vehicle Maintenance",
    content:
      "Regular check-ups and maintenance to prevent breakdowns and extend your vehicle's lifespan.",
  },
  {
    title: "Oil Replacement",
    content:
      "Fresh oil changes to lubricate engine parts and maintain optimal performance and efficiency.",
  },
  {
    title: "Cooling System Repair",
    content:
      "Repair and maintenance of radiators, hoses, and thermostats to prevent overheating and engine damage.",
  },
  {
    title: "Oil Filter Replacement",
    content:
      "Replacing filters to remove contaminants and protect the engine from harmful particles.",
  },
  {
    title: "Air Filter Replacement",
    content:
      "Clean air filters for better fuel efficiency, improved air quality, and engine protection.",
  },
  {
    title: "Brake Repair",
    content:
      "Inspection and repair of brake systems for safe stopping power and enhanced vehicle safety.",
  },
  {
    title: "Engine Diagnostic",
    content:
      "Advanced diagnostics to identify and resolve engine issues quickly, saving time and money.",
  },
  {
    title: "Transmission Services",
    content:
      "Maintenance and repair of transmission systems for smooth gear shifts and reliable performance.",
  },
];

interface ServicesProps {
  onServiceSelect: (service: string) => void;
}

const Services = ({ onServiceSelect }: ServicesProps) => {
  const handleServiceClick = (title: string) => {
    onServiceSelect(title);
    // Scroll to the form
    const form = document.getElementById("schedule-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card
            key={index}
            className="hover:shadow-lg cursor-pointer transition-shadow"
            onClick={() => handleServiceClick(service.title)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
