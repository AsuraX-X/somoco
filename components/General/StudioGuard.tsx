"use client";

import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

export default function StudioGuard({ header, footer, children }: Props) {
  const pathname = usePathname();

  // Consider any path that includes `/studio` as the studio route.
  const isStudio =
    typeof pathname === "string" && pathname.startsWith("/studio");

  return (
    <>
      {!isStudio && header}
      {children}
      {!isStudio && footer}
    </>
  );
}
