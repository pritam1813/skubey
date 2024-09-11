"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 250) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  return (
    <>
      {showButton && (
        <button
          onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
          className="tw-fixed tw-right-7.5 tw-bottom-7.5 tw-z-50 tw-block tw-animate-topToBottom"
        >
          <Image
            src="/images/back-top.png"
            alt="back to top button"
            width={48}
            height={48}
          />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
