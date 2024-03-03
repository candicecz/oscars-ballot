"use client";
import React, { useState } from "react";

export const Grid = ({ children }: { children: React.ReactNode }) => {
  const [numColumns, setNumColumns] = useState(2);
  console.log(numColumns);
  return (
    <div className="">
      <div
        className="inline-flex w-full rounded-md shadow-sm mb-2 justify-end"
        role="group"
      >
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium text-oscars-900 ${
            numColumns === 1 ? "bg-oscars-200" : "bg-white"
          } ${
            numColumns === 1 ? "dark:bg-oscars-600" : "dark:bg-oscars-800"
          } border border-oscars-200 rounded-s-lg hover:bg-oscars-100 hover:text-oscars-700 focus:z-10 focus:ring-1 focus:ring-oscars-700 focus:text-oscars-700  dark:border-oscars-700 dark:text-white dark:hover:text-white dark:hover:bg-oscars-700 dark:focus:ring-brandy-500 dark:focus:text-white`}
          onClick={() => setNumColumns(1)}
        >
          1
        </button>
        <button
          type="button"
          className={`
          ${numColumns === 2 ? "bg-oscars-200" : "bg-white"} ${
            numColumns === 2 ? "dark:bg-oscars-600" : "dark:bg-oscars-800"
          } px-4 py-2 text-sm font-medium text-oscars-900 border-t border-b border-oscars-200 hover:bg-oscars-100 hover:text-oscars-700 focus:z-10 focus:ring-1 focus:ring-oscars-700 focus:text-oscars-700 dark:border-oscars-700 dark:text-white dark:hover:text-white dark:hover:bg-oscars-700 dark:focus:ring-brandy-500 dark:focus:text-white`}
          onClick={() => setNumColumns(2)}
        >
          2
        </button>
        <button
          type="button"
          className={`${numColumns === 3 ? "bg-oscars-200" : "bg-white"} ${
            numColumns === 3 ? "dark:bg-oscars-600" : "dark:bg-oscars-800"
          } px-4 py-2 text-sm font-medium text-oscars-900 border border-oscars-200 rounded-e-lg hover:bg-oscars-100 hover:text-oscars-700 focus:z-10 focus:ring-1 focus:ring-oscars-700 focus:text-oscars-700 dark:border-oscars-700 dark:text-white dark:hover:text-white dark:hover:bg-oscars-700 dark:focus:ring-brandy-500 dark:focus:text-white`}
          onClick={() => setNumColumns(3)}
        >
          3
        </button>
      </div>
      <div
        id="accordion-open"
        data-accordion="open"
        className={`grid grid-cols-${"" + numColumns}`}
      >
        {children}
      </div>
    </div>
  );
};
