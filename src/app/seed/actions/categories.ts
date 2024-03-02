"use server";

import clientPromise from "../../../../lib/mongodb";
import { CATEGORIES_DATA } from "../data/categories";

export const seedCategories = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    await db
      .collection("categories")
      .insertMany(CATEGORIES_DATA.map((category) => category));
    return { success: true };
  } catch (e: any) {
    console.error(e);
    return { success: false, error: e.message };
  }
};
