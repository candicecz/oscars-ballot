import { getCategories } from "@/queries/categories";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const categories = await getCategories();
  revalidatePath("/");
  return NextResponse.json(categories, { status: 200 });
}
