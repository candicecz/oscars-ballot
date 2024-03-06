import { getCategories } from "@/queries/categories";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const categories = await getCategories();
  return NextResponse.json(categories, { status: 200 });
}
