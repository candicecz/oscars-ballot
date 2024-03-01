"use client";

import { Category } from "@/types";
import { useRouter } from "next/navigation";
import { transformCategoryName2Slug } from "./helpers";

export const SelectCategory = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  return (
    <div className="w-full flex justify-end  px-4 py-2">
      <form className="max-w-sm flex-1 py-4">
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
