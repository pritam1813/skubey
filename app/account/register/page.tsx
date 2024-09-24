import React from "react";
import Link from "next/link";
import Registration from "@/components/Forms/Registration";

const Register = () => {
  return (
    <div
      id="content"
      className="col-sm-9 tw-relative tw-min-h-[80vh] tw-text-primary tw-order-1 lg:tw-order-2"
    >
      <p>
        If you already have an account with us, please{" "}
        <Link href="/account/login" className="tw-text-primary">
          login
        </Link>
        .
      </p>
      <Registration />
    </div>
  );
};

export default Register;
