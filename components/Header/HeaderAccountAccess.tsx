"use client";
import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AnimateHeight from "react-animate-height";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthMenu } from "@/data/menu";
import { logout } from "@/app/actions";
import useSWR from "swr";
import { fetcher } from "@/app/utils/fetcherFunctions";

const HeaderAccountAccess = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // Remove revalidateOnMount dependency on isOpen
  const { data, mutate } = useSWR("/api/auth/session", fetcher);
  const user = data?.user;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAccountShow = () => {
    mutate();
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await logout();
    await mutate(); // Revalidate the session data
    setIsOpen(false);
    router.refresh();
  };

  // Memoize filtered menu items
  const menuItems = React.useMemo(() => {
    return AuthMenu.filter((item) => {
      if (user) {
        return item.isAuthRequired && item.showOnHeader;
      }
      return !item.showAfterAuth && item.showOnHeader;
    });
  }, [user]);

  return (
    <div className="tw-mx-5 lg:tw-mx-7.5 tw-relative">
      <button
        className="tw-flex tw-py-5"
        onClick={handleAccountShow}
        ref={buttonRef}
      >
        <FontAwesomeIcon
          icon={faUser}
          className="tw-w-5 tw-h-5 tw-text-primary"
        />
      </button>
      <AnimateHeight
        duration={500}
        height={isOpen ? "auto" : 0}
        className="tw-absolute tw-top-16 tw-right-0 tw-left-auto tw-z-20"
      >
        <ul
          ref={dropdownRef}
          className="tw-bg-secondary tw-px-0 tw-py-2 tw-min-w-40 tw-text-left tw-list-none tw-w-48 tw-shadow-headerItems"
        >
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.title === "Logout" ? (
                <button
                  onClick={handleSignOut}
                  className="tw-text-left tw-block tw-w-full tw-clear-both tw-whitespace-nowrap tw-text-primary hover:tw-text-secondaryLight tw-no-underline tw-py-[7px] tw-px-3.75 tw-font-medium tw-text-sm/5"
                >
                  {item.title}
                </button>
              ) : (
                <Link
                  className="tw-text-left tw-block tw-w-full tw-clear-both tw-whitespace-nowrap tw-text-primary hover:tw-text-secondaryLight tw-no-underline tw-py-[7px] tw-px-3.75 tw-font-medium tw-text-sm/5"
                  href={item.path}
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </AnimateHeight>
    </div>
  );
};

export default HeaderAccountAccess;
