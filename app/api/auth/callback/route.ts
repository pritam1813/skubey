import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("callback: ", data);

    if (!error) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(new URL("/error", request.url));
}
