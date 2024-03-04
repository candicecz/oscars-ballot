"use client";
import { useLocalStorage } from "usehooks-ts";
import React from "react";

export const CollapseButton = () => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage("isCollapsed", false);
  return (
    <button
      type="button"
      onClick={() => setIsCollapsed(!isCollapsed)}
      className="mx-1 px-3 py-2 text-xs text-brandy-900 hover:text-white border-2 border-brandy-200 hover:bg-brandy-900 focus:ring-1 focus:outline-none focus:ring-brandy-300 font-semibold rounded-lg text-center dark:border-brandy-600 dark:text-brandy-400 dark:hover:text-white dark:hover:bg-brandy-600 dark:focus:ring-brandy-800"
    >
      {isCollapsed ? "Expand" : "Collapse"} all
    </button>
  );
};

export const GridButtons = () => {
  const [numColumns, setNumColumns] = useLocalStorage("gridColumns", 2);
  return (
    <div className="hidden sm:block inline-flex rounded-md mx-1" role="group">
      <button
        type="button"
        className={`px-2 py-1.5 text-sm font-medium text-brandy-900 ${
          numColumns === 1 ? "bg-brandy-200" : "bg-white"
        } ${
          numColumns === 1 ? "dark:bg-brandy-600" : "dark:bg-brandy-800"
        } border-2 border-brandy-200 rounded-s-lg hover:bg-brandy-100 hover:text-brandy-700 focus:z-10 focus:ring-1 focus:ring-brandy-700 focus:text-brandy-700  dark:border-brandy-700 dark:text-white dark:hover:text-white dark:hover:bg-brandy-700 dark:focus:ring-brandy-500 dark:focus:text-white`}
        onClick={() => setNumColumns(1)}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 20 20"
          width="20px"
          height="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.33,3.33H16.67V6.67H3.33Z" fill="currentColor" />
          <path d="M3.33,8.33H16.67v3.34H3.33Z" fill="currentColor" />
          <path d="M16.67,13.33H3.33v3.34H16.67Z" fill="currentColor" />
        </svg>
      </button>
      <button
        type="button"
        className={`
      ${numColumns === 2 ? "bg-brandy-200" : "bg-white"} ${
          numColumns === 2 ? "dark:bg-brandy-600" : "dark:bg-brandy-800"
        } px-2 py-1.5 text-sm font-medium text-brandy-900 border-t-2 border-b-2 border-brandy-200 hover:bg-brandy-100 hover:text-brandy-700 focus:z-10 focus:ring-1 focus:ring-brandy-700 focus:text-brandy-700 dark:border-brandy-700 dark:text-white dark:hover:text-white dark:hover:bg-brandy-700 dark:focus:ring-brandy-500 dark:focus:text-white`}
        onClick={() => setNumColumns(2)}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 20 20"
          width="20px"
          height="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.33,3.33H8.67V8.67H3.33Z" fill="currentColor" />
          <path d="M3.33,11.33H8.67v5.34H3.33Z" fill="currentColor" />
          <path d="M11.33,3.33h5.34V8.67H11.33Z" fill="currentColor" />
          <path d="M16.67,11.33H11.33v5.34h5.34Z" fill="currentColor" />
        </svg>
      </button>
      <button
        type="button"
        className={`${numColumns === 3 ? "bg-brandy-200" : "bg-white"} ${
          numColumns === 3 ? "dark:bg-brandy-600" : "dark:bg-brandy-800"
        } px-2 py-1.5 text-sm font-medium text-brandy-900 border-2 border-brandy-200 rounded-e-lg hover:bg-brandy-100 hover:text-brandy-700 focus:z-10 focus:ring-1 focus:ring-brandy-700 focus:text-brandy-700 dark:border-brandy-700 dark:text-white dark:hover:text-white dark:hover:bg-brandy-700 dark:focus:ring-brandy-500 dark:focus:text-white`}
        onClick={() => setNumColumns(3)}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 20 20"
          width="20px"
          height="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.33,3.33H6.67V6.67H3.33Z" fill="currentColor" />
          <path d="M3.33,8.33H6.67v3.34H3.33Z" fill="currentColor" />
          <path d="M6.67,13.33H3.33v3.34H6.67Z" fill="currentColor" />
          <path d="M8.33,3.33h3.34V6.67H8.33Z" fill="currentColor" />
          <path d="M11.67,8.33H8.33v3.34h3.34Z" fill="currentColor" />
          <path d="M8.33,13.33h3.34v3.34H8.33Z" fill="currentColor" />
          <path d="M16.67,3.33H13.33V6.67h3.34Z" fill="currentColor" />
          <path d="M13.33,8.33h3.34v3.34H13.33Z" fill="currentColor" />
          <path d="M16.67,13.33H13.33v3.34h3.34Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
};
