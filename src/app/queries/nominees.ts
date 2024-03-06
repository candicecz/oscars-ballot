import { Nominee } from "@/types";
import clientPromise from "../../../lib/mongodb";

export const getNominees = async (): Promise<{ nominees: Nominee[] }> => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const nominees = await db
      .collection("nominees")
      .find({})
      .sort({ categoryId: 1 })
      .limit(1000)
      .toArray();
    return {
      nominees: JSON.parse(JSON.stringify(nominees)),
    };
  } catch (e) {
    console.error(e);
    return { nominees: [] };
  }
};
