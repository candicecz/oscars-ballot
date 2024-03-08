"use server";

import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { getServerSession } from "next-auth/next";
import { getUserByEmail } from "@/queries/users";
import { authOptions } from "@/api/auth/[...nextauth]/config";

// add an existing user to the current team
export const addUserToTeam = async (_: any, formData: FormData) => {
  try {
    const [formValue] = Array.from(formData.values());

    if (!formValue) {
      return { error: "Please enter an email address.", success: false };
    }

    const email = "" + formValue;
    //  Check if invited user is in database.
    const { user: invitedUser } = await getUserByEmail({
      email,
    });

    if (!invitedUser) {
      return { error: "User not found.", success: false };
    }

    // Check if current user is already in a team.
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { error: "Error processing request.", success: false };
    }
    const { user: currentUser } = await getUserByEmail({
      email: session?.user?.email,
    });

    if (!currentUser) {
      return { error: "Error processing request.", success: false };
    }
    //  Check if invited user is already part of the current user's team.
    if (
      !!currentUser.teamId &&
      !!invitedUser.teamId &&
      invitedUser?.teamId === currentUser.teamId
    ) {
      return { error: "User is already in your team.", success: false };
    }

    //  Check if invited user is already part of team. Limit to one team per person right now.
    if (!!invitedUser.teamId) {
      return { error: "User is already in a team.", success: false };
    }

    // if current user has a team id, add team id to invited user
    if (currentUser?.teamId) {
      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME);
      await db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(invitedUser._id) },
          { $set: { teamId: new ObjectId(currentUser.teamId) } }
        );
      return { success: true };
    } else {
      // if current user does not have a team id, generate a common team id for both users
      const teamId = new ObjectId();
      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME);
      await db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(invitedUser._id) },
          { $set: { teamId } }
        );

      await db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(currentUser._id) },
          { $set: { teamId } }
        );
    }

    return { success: true };
  } catch (e: any) {
    console.error(e);
    return {
      error: e.message,
      success: false,
    };
  }
};

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
