import { getUsers } from "@/queries/users";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const users = await getUsers();
  return NextResponse.json(users, { status: 200 });
}
