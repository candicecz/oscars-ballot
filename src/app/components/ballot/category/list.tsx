"use client";

import React from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { CollapseButton, GridButtons } from "./buttons";

interface GridProps {
  children: React.ReactNode;
}

export const CategoriesList = ({ children }: GridProps) => {
  const gridColumns = useReadLocalStorage("gridColumns") as number;
  return (
    <div className="">
      <div className="flex items-center justify-end my-2">
        <GridButtons />
        <CollapseButton />
      </div>
      <div
        id="accordion-open"
        data-accordion="open"
        className={`grid grid-cols-${"" + gridColumns}`}
      >
        {children}
      </div>
    </div>
  );
};
