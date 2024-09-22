import React from "react";
import Link from "next/link";
import Registration from "@/components/Forms/Registration";

const Register = () => {
  return (
    <>
      <p>
        If you already have an account with us, please{" "}
        <Link href="/login" className="tw-text-primary">
          login
        </Link>
        .
      </p>
      <Registration />
    </>
  );
};

export default Register;
