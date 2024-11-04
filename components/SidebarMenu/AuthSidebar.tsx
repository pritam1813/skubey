import React from "react";
import SidebarMenu from "@/components/SidebarMenu";
import { AuthMenu } from "@/data/menu";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";

const AuthSidebar = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // console.log("sss", session);

  return (
    <SidebarMenu
      menuTitle="Account"
      menuItems={AuthMenu.map((item, index) => {
        const { showAfterAuth, isAuthRequired, title, path } = item;
        return (session && (showAfterAuth || isAuthRequired)) ||
          (!session && !isAuthRequired) ? (
          <li key={index}>
            <Link
              href={path}
              className={`${
                index === 0 ? "-tw-mt-1 tw-pb-2" : "tw-py-2"
              } tw-no-underline tw-text-sm tw-capitalize tw-transition-all tw-duration-300 tw-text-secondaryLight hover:tw-text-primary tw-relative tw-block`}
            >
              {title}
            </Link>
          </li>
        ) : null;
      })}
    />
  );
};

export default AuthSidebar;
