import { CategoryWithNominees } from "@/types";
import clientPromise from "../../../lib/mongodb";

export const revalidate = 0;
export const getCategories = async (): Promise<{
  categories: CategoryWithNominees[];
}> => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const categories = await db
      .collection("categories")
      .aggregate([
        {
          $lookup: {
            from: "nominees",
            localField: "_id",
            foreignField: "categoryId",
            as: "nominees",
          },
        },
      ])
      .sort({ name: 1 })
      .limit(1000)
      .toArray();
    return {
      categories: JSON.parse(JSON.stringify(categories)),
    };
  } catch (e) {
    console.error(e);
    return { categories: [] };
  }
};
