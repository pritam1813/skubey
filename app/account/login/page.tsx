import React from "react";
import Link from "next/link";
import LoginForm from "@/components/Forms/LoginForm";

const Login = () => {
  return (
    <div id="content" className="col-sm-6 tw-order-1 lg:tw-order-2 tw-mx-auto">
      <p className="tw-text-center">
        Don't have an account ? Sign Up{" "}
        <Link href="/account/register" className="tw-text-primary">
          Here
        </Link>
        .
      </p>
      <div className="tw-p-5 tw-mb-5 tw-bg-backgroundColor">
        <h2 className="tw-text-lg/5 tw-mb-2.5">Returning Customer Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
