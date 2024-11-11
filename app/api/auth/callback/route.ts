import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    // console.log("callback: ", data);

    if (!error) {
      redirectTo.pathname = "/dashboard";
      return NextResponse.redirect(redirectTo);
    }
  }

  // Return the user to an error page with some instructions
  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}
