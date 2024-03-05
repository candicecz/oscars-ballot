"use client";

import React, { useEffect, useState } from "react";
import { CategoryWithNominees } from "@/types";
import { transformCategoryName2Slug } from "../helpers";

export interface CategoryCardProps extends CategoryWithNominees {
  hasValueSelected?: boolean;
  isCollapsed?: boolean;
  isVotingOpen?: boolean;
  children: React.ReactNode;
}

export const CategoryCard = ({
  name,
  hasValueSelected,
  isCollapsed,
  isVotingOpen,
  children,
}: CategoryCardProps) => {
  const [open, setOpen] = useState(isCollapsed ? !isCollapsed : true);

  useEffect(() => {
    setOpen(!isCollapsed);
  }, [isCollapsed]);

  return (
    <section
      id={transformCategoryName2Slug(name)}
      className="w-full h-full flex flex-col"
    >
      <h2 id="accordion-open-heading-1">
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-oscars-500 bg-white hover:bg-oscars-100 border border-oscars-200 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-800 dark:border-oscars-800 dark:hover:bg-gray-900 gap-3`}
          data-accordion-target="#accordion-open-body-1"
          aria-expanded="true"
          aria-controls="accordion-open-body-1"
          onClick={() => setOpen(!open)}
        >
          <span className="flex items-center truncate">
            {name}
            {/* Check mark when radio button is selected */}
            {isVotingOpen && hasValueSelected && (
              <svg
                className="w-4 h-4 mx-2 text-green-500 dark:text-green.200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"
                ></path>
              </svg>
            )}
          </span>
          {/* open + close envelop icon denoting the open and closing of the category */}
          <svg
            className="w-4 h-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d={
                open
                  ? "M8.41,3.75H3.75v6.93L0,7.91A2.48,2.48,0,0,1,1,6.12l.87-.64V3.75A1.86,1.86,0,0,1,3.75,1.88h3L8.69.43a2.21,2.21,0,0,1,2.62,0l1.95,1.45h3a1.87,1.87,0,0,1,1.88,1.87V5.48l.86.64a2.48,2.48,0,0,1,1,1.79l-3.74,2.77V3.75H8.41ZM0,17.5v-8l8.5,6.29a2.53,2.53,0,0,0,1.5.5,2.46,2.46,0,0,0,1.5-.5L20,9.46v8h0A2.5,2.5,0,0,1,17.5,20H2.5A2.5,2.5,0,0,1,0,17.5ZM6.88,6.25h6.25a.63.63,0,0,1,0,1.25H6.88a.63.63,0,1,1,0-1.25Zm0,2.5h6.25a.63.63,0,0,1,0,1.25H6.88a.63.63,0,1,1,0-1.25Z"
                  : "M1.88,5A1.87,1.87,0,0,0,.75,8.37l8.5,6.38a1.26,1.26,0,0,0,1.5,0l8.5-6.38A1.87,1.87,0,0,0,18.13,5ZM0,9.37V17.5A2.5,2.5,0,0,0,2.5,20h15A2.5,2.5,0,0,0,20,17.5V9.37l-8.5,6.38a2.49,2.49,0,0,1-3,0Z"
              }
              transform="translate(0 0)"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-open-body-1"
        className={`flex-1 ${open ? "block" : "hidden"}`}
        aria-labelledby="accordion-open-heading-1"
      >
        <ul className="h-full bg-slate-100 p-5 border border-b-1 border-gray-200 dark:border-gray-700 dark:bg-gray-950">
          {/* nominees as radio buttons when voting is open */}
          {children}
        </ul>
      </div>
    </section>
  );
};
