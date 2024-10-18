import { NextResponse } from "next/server";
import { ReviewFormData } from "@/components/Products/ProductReviewForm";

export async function POST(req: Request) {
  try {
    const jsondata: ReviewFormData = await req.json();
    //console.log("Json Data: ", jsondata);
    return NextResponse.json(jsondata, { status: 201 });
  } catch (error) {
    console.error(error);
  }
}
