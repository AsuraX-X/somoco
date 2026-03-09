import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Vehicles",
  description:
    "Compare Bajaj vehicles side-by-side at Somoco Ghana Limited. View specs, engine details, horsepower, torque, and more to find the right vehicle for you.",
  keywords: [
    "compare vehicles Ghana",
    "Bajaj vehicle comparison",
    "motorcycle comparison Ghana",
    "Somoco compare",
    "vehicle specs comparison",
  ],
  openGraph: {
    title: "Compare Vehicles | Somoco Ghana Limited",
    description:
      "Compare Bajaj vehicles side-by-side. View specs, engine details, and more to find the right vehicle for you.",
    url: "https://www.somocoghana.com/compare",
  },
  alternates: {
    canonical: "https://www.somocoghana.com/compare",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
