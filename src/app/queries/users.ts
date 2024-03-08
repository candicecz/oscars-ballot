import { User } from "@/types";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET user by ID
export const getUserById = async ({
  _id,
}: {
  _id: ObjectId;
}): Promise<{
  user: User | null;
}> => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const users = await db.collection("users").find({ _id }).toArray();
    return {
      user: JSON.parse(JSON.stringify(users[0])),
    };
  } catch (e) {
    console.error(e);
    return { user: null };
  }
};

export const getUserByEmail = async ({
  email,
}: {
  email: string;
}): Promise<{
  user: User | null;
}> => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const users = await db.collection("users").find({ email }).toArray();
    if (users.length === 0) return { user: null };
    return {
      user: JSON.parse(JSON.stringify(users[0])),
    };
  } catch (e) {
    console.error(e);
    return { user: null };
  }
};

// GET users
export const getUsers = async (): Promise<{
  users: User[];
}> => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const users = await db
      .collection("users")
      .find({})
      .sort({ name: 1 })
      .limit(1000)
      .toArray();
    return {
      users: JSON.parse(JSON.stringify(users)),
    };
  } catch (e) {
    console.error(e);
    return { users: [] };
  }
};

// GET users from same team
export const getUsersByTeamId = async ({
  teamId,
}: {
  teamId?: string;
}): Promise<{
  users: User[];
}> => {
  try {
    if (!teamId) return { users: [] };
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const users = await db
      .collection("users")
      .find({ teamId: new ObjectId(teamId) })
      .sort({ name: 1 })
      .limit(1000)
      .toArray();

    return {
      users: JSON.parse(JSON.stringify(users)),
    };
  } catch (e) {
    console.error(e);
    return { users: [] };
  }
};
