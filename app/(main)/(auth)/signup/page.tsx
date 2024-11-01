import React from "react";
import Registration from "@/components/Forms/Registration";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }
  return (
    <div
      id="content"
      className="col-sm-9 tw-relative tw-min-h-[80vh] tw-text-primary tw-order-1 lg:tw-order-2"
    >
      <p>
        If you already have an account with us, please{" "}
        <Link href="/login" className="tw-text-primary">
          login
        </Link>
        .
      </p>
      <Registration />
    </div>
  );
}
