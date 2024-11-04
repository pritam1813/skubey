"use client";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AnimateHeight from "react-animate-height";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";
import { AuthMenu } from "@/data/menu";

const HeaderAccountAccess = () => {
  const [showAccountItems, setShowAccountItems] = useState(false);
  const [height, setHeight] = useState<string | number>(0);
  const [user, setUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowAccountItems(false);
        setHeight(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAccountShow = () => {
    setShowAccountItems(!showAccountItems);
    setHeight(height === 0 ? "auto" : 0);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();

    router.refresh();

    setShowAccountItems(false);
    setHeight(0);
  };
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
        <AnimateHeight
          duration={500}
          height={height as number}
          className="tw-absolute tw-top-16 tw-right-0 tw-left-auto tw-z-20"
        >
          <ul
            ref={dropdownRef}
            className="tw-bg-secondary tw-px-0 tw-py-2 tw-min-w-40 tw-text-left tw-list-none tw-w-48 tw-shadow-headerItems  "
          >
            {AuthMenu.map((item) =>
              (user && item.isAuthRequired && item.showOnHeader) ||
              (!user && !item.showAfterAuth && item.showOnHeader) ? (
                <li key={item.path}>
                  {item.title === "Logout" ? (
                    <span
                      onClick={handleSignOut}
                      className="tw-text-left tw-block tw-w-full tw-clear-both tw-whitespace-nowrap tw-text-primary hover:tw-text-secondaryLight tw-no-underline tw-py-[7px] tw-px-3.75 tw-font-medium tw-text-sm/5"
                    >
                      {item.title}
                    </span>
                  ) : (
                    <Link
                      className="tw-text-left tw-block tw-w-full tw-clear-both tw-whitespace-nowrap tw-text-primary hover:tw-text-secondaryLight tw-no-underline tw-py-[7px] tw-px-3.75 tw-font-medium tw-text-sm/5"
                      href={item.path}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ) : null
            )}
          </ul>
        </AnimateHeight>
      </button>
    </div>
  );
};

export default HeaderAccountAccess;
