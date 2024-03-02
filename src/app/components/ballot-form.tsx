import { SelectCategory } from "./ballot/category/select";
import { CategoryCard } from "./ballot/category/card";
import { getCategories } from "@/queries/categories";

export const BallotForm = async () => {
  const { categories } = await getCategories();

  return (
    <div className="px-4 py-2">
      <SelectCategory categories={categories} />
      <div id="accordion-open" data-accordion="open">
        {categories.map((category) => {
          return <CategoryCard key={category.name} {...category} />;
        })}
      </div>
    </div>
  );
};
