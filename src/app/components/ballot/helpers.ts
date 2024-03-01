import { Category } from "@/types";

export const transformCategoryName2Slug = (category: Category["name"]) => {
  return category.toLowerCase().split(" ").join("-");
};
