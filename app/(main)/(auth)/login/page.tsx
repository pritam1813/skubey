import React from "react";
import LoginForm from "@/components/Forms/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div id="content" className="col-sm-6 tw-order-1 lg:tw-order-2 tw-mx-auto">
      <p className="tw-text-center">
        Don&apos;t have an account ? Sign Up{" "}
        <Link href="/signup" className="tw-text-primary">
          Here
        </Link>
      </p>
      <div className="tw-p-5 tw-mb-5 tw-bg-backgroundColor">
        <h2 className="tw-text-lg/5 tw-mb-2.5">Returning Customer Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
