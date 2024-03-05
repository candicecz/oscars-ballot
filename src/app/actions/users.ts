"use server";

import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/queries/users";

// UPDATE ballot for user
export const updateBallotForUser = async (_: any, formData: FormData) => {
  try {
    const form = Array.from(formData.entries()) as unknown as [
      string,
      string
    ][];
    const ballot = form.reduce((ballotForm, [categoryId, nomineeId]) => {
      if (ballotForm[categoryId]) {
        ballotForm[categoryId] = nomineeId;
      } else {
        ballotForm[categoryId] = nomineeId;
      }
      return ballotForm;
    }, {} as { [key: string]: string });

    const session = await getServerSession(authOptions);
    const email = session?.user?.email || "";
    const { user } = await getUserByEmail({
      email,
    });
    const userId = user?._id;
    if (!userId) {
      return {
        form: ballot,
        success: false,
        error: { message: "User not found." },
      };
    }
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(userId) }, { $set: { ballot } });
    return { form: ballot, success: true };
  } catch (e: any) {
    console.error(e);
    return {
      form: {} as { [key: string]: string },
      error: e.message,
      success: false,
    };
  }
};
