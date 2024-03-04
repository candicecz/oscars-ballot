"use client";

import React from "react";
import { CategoryWithNominees, Nominee } from "@/types";
import { useState } from "react";
import { transformCategoryName2Slug } from "../helpers";

export interface CategoryCardProps extends CategoryWithNominees {
  updateForm: (nomineeId: Nominee["_id"]) => void;
}

export const CategoryCard = ({
  _id,
  name,
  nominees,
  updateForm,
  ...rest
}: CategoryCardProps) => {
  const [open, setOpen] = useState(true);

  return (
    <section id={transformCategoryName2Slug(name)} className="w-full ">
      <h2 id="accordion-open-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
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
        <ul className="p-5 border border-b-1 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {/* nominees as radio buttons when voting is open */}
          {nominees.map((nominee) => (
            <li key={nominee._id}>
              <input
                type="radio"
                id={`category-${nominee._id}`}
                name={"" + name}
                value={"" + nominee._id}
                className="hidden peer"
                onChange={() => updateForm(nominee._id)}
              />
              <label
                htmlFor={`category-${nominee._id}`}
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-oscars-200 dark:hover:text-oscars-300 dark:border-gray-700 dark:peer-checked:text-oscars-500 peer-checked:border-oscars-600 peer-checked:text-oscars-600 hover:text-oscars-600 hover:bg-oscars-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <p>{nominee.name}</p>
                  <p>{nominee.credits}</p>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
