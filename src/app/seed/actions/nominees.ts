"use server";

import { getCategories } from "@/queries/categories";
import clientPromise from "../../../../lib/mongodb";
import { NOMINEES_DATA } from "../data/nominees";
import { ObjectId } from "mongodb";

export const seedNominees = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const { categories } = await getCategories();

    await db.collection("nominees").insertMany(
      NOMINEES_DATA.map((nominee) => ({
        ...nominee,
        categoryId:
          new ObjectId(
            categories?.find(
              (category) => category.name === nominee.category
            )?._id
          ) || null,
      }))
    );

    return { success: true };
  } catch (e: any) {
    console.error(e);
    return { success: false, error: e.message };
  }
};
