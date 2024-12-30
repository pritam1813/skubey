import React from "react";
import Registration from "@/components/Forms/Registration";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "@/app/lib/dal";

export default async function SignUp() {
  const session = await verifySession();
  //console.log(isAuth);

  if (session?.isAuth) {
    return redirect("/user");
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
