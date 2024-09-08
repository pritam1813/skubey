"use client";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewsLetter = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const emailInput = () => {
    const validEmail = z.string().email().safeParse(emailRef.current?.value);
    setIsValidEmail(!validEmail.success);
    !validEmail.success && setTimeout(() => setIsValidEmail(false), 5000);
    console.log("Is it valid", isValidEmail);
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <section className="animate__animated animate__fadeInUp tw-mt-7.5 lg:tw-mt-13 tw-z-0">
      <div className="container tw-px-3.75">
        <div
          id="newsinner"
          className="tw-px-5 tw-py-7.5 xxl:tw-p-13 tw-rounded-cardcustom tw-bg-secondaryHover"
        >
          <div id="newsletterblock" className="row">
            <div className="col-xl-6">
              <div
                id="newsletterDesc"
                className="d-block d-md-flex justify-content-md-center align-items-center max-xl:tw-mb-3.75 max-md:tw-text-center"
              >
                <div className="tw-bg-primaryHover tw-w-25 tw-h-25 tw-leading-[90px] tw-text-[40px] tw-text-center tw-rounded-full max-md:tw-mx-auto max-md:tw-mt-auto max-md:tw-mb-3.75 md:tw-mr-6">
                  <FontAwesomeIcon
                    icon={faEnvelopeOpen}
                    className="tw-text-primary"
                  />
                </div>
                <div className=" tw-text-primary">
                  <div>
                    <h3 className="tw-text-[22px] tw-mb-2.5">Newsletter</h3>
                  </div>
                  <div className="tw-text-sm">
                    Subscribe and get notified at first on the latest update and
                    offers!
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 d-flex align-items-center">
              <div className="tw-w-full">
                <div className="tw-block max-xs:tw-text-center xs:tw-flex max-xl:tw-max-w-2xl max-xl:tw-m-auto">
                  <input
                    type="email"
                    className={`max-xs:tw-rounded-cardcustom xs:tw-rounded-tl-cardcustom xs:tw-rounded-bl-cardcustom max-xs:tw-mb-2.5 tw-py-1.2 tw-px-7.5 tw-h-13 xl:tw-h-[70px] tw-border-none tw-bg-backgroundColor tw-text-secondaryLight tw-text-sm tw-font-normal tw-w-full tw-outline-0 tw-outline-none  `}
                    placeholder="Enter Your E-mail.."
                    ref={emailRef}
                  />
                  {isValidEmail && (
                    <div className="tw-mb-1 xs:tw-absolute xs:max-xl:tw-bottom-0 xl:tw-top-3/4 xs:tw-left-1/3 sm:tw-left-[40%] xl:tw-left-[68%]  tw-text-xs xl:tw-text-sm tw-text-[#b91c1c] animate__animated animate__fadeInDown">
                      Please enter a valid email
                    </div>
                  )}
                  <button
                    className="tw-text-secondary hover:tw-text-primary tw-bg-primary hover:tw-bg-primaryHover tw-border-none max-xs:tw-rounded-cardcustom xs:tw-rounded-tr-cardcustom xs:tw-rounded-br-cardcustom tw-py-2.5 tw-px-7.5 tw-text-sm tw-font-medium tw-transition-all tw-duration-500 tw-ease-in-out"
                    onClick={emailInput}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
