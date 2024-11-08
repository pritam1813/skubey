import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PATCH(request: Request) {
  const data = await request.json();
  console.log("Backend Data: ", data);

  return NextResponse.json(
    { success: true, message: "Address added successfully" },
    { status: 200 }
  );
}
