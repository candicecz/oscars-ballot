"use server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export const updateCategoryWinner = async ({
  categoryId,
  winnerId,
}: {
  categoryId: string;
  winnerId: string;
}) => {
  try {
    if (!categoryId || !winnerId) {
      return;
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    await db
      .collection("categories")
      .updateOne(
        { _id: new ObjectId(categoryId) },
        { $set: { winnerId: winnerId } }
      );

    return {
      success: true,
    };
  } catch (e: any) {
    console.error(e);
    return { error: e.message, success: false };
  }
};
