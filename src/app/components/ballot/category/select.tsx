"use client";

import { Category } from "@/types";
import { useRouter } from "next/navigation";
import { transformCategoryName2Slug } from "../helpers";

export const SelectCategory = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  return (
    <div className="w-full flex justify-end py-4">
      <form className="max-w-sm flex-1 py-0 overflow-hidden border border-gray-300 rounded-lg focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 focus-visible:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <label htmlFor="categories" className="hidden">
          Select an award category
        </label>
        <select
          name="categories"
          onChange={(e) => {
            const category_name = e.target.value;
            if (category_name === "ALL") return router.push("#");
            router.push("#" + transformCategoryName2Slug(category_name));
          }}
          className="p-2 bg-gray-50 text-gray-900 text-sm block w-full h-full rounded-lg border-8 border-transparent focus-visible:outline-blue-500 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white "
        >
          <option value="ALL">Select a category </option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};
