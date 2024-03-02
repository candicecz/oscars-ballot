"use client";
import { Category } from "@/types";
import { useState } from "react";
import { transformCategoryName2Slug } from "../helpers";

export const CategoryCard = ({ name, nominees, ...rest }: Category) => {
  const [open, setOpen] = useState(true);
  return (
    <section id={transformCategoryName2Slug(name)}>
      <h2 id="accordion-open-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-open-body-1"
          aria-expanded="true"
          aria-controls="accordion-open-body-1"
          onClick={() => setOpen(!open)}
        >
          <span className="flex items-center">{name}</span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-open-body-1"
        className={open ? "block" : "hidden"}
        aria-labelledby="accordion-open-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {nominees.map((nominee) => (
            <p key={nominee.name}>{nominee.name}</p>
          ))}
        </div>
      </div>
    </section>
  );
};
