import { getBaseUrl } from "@/app/utils/getBaseUrl";
import { createClient } from "@/app/utils/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const token = searchParams.get("token") as string;
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";
  const email = searchParams.get("email") as string;
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  console.log("REdirext: ", redirectTo);

  const supabase = await createClient();

  if (token && type) {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    });

    if (error) {
      console.log(error);

      return NextResponse.json({ error: error.code }, { status: error.status });
    }

    NextResponse.redirect(`${getBaseUrl()}/login?emailverified=true`);
  }

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });
    console.log("OTP Error2: ", error?.cause);

    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  // return the user to an error page with some instructions

  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}
