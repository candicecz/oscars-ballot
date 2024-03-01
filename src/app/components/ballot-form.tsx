import clientPromise from "../../../lib/mongodb";
import { Category } from "@/types";

export const BallotForm = async () => {
  const { categories } = await getData();
  return (
    <>
      {categories.map(({ name, nominees }) => {
        return (
          <div key={name}>
            <div>{name}</div>
            <div>
              {nominees?.map((nominee) => {
                return <div key={nominee._id}>{nominee.name}</div>;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

const getData = async (): Promise<{ categories: Category[] }> => {
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
      .limit(40)
      .toArray();
    return {
      categories: JSON.parse(JSON.stringify(categories)),
    };
  } catch (e) {
    console.error(e);
    return { categories: [] };
  }
};
