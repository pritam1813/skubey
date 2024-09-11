import React from "react";
import Image from "next/image";

import { FooterItems } from "@/data/footeritems";
import ToggledList from "./ToggledList";
import { Socials } from "@/data/socials";
import Link from "next/link";
import { paymentIcons } from "@/data/payments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTop from "./ScrollToTop";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="tw-mt-7.5 lg:tw-mt-13">
      {/* Footer Images Animation */}
      <div id="footerImages" className="tw-relative">
        <Image
          src="/images/footer/footer-bg.png"
          alt="Footer Background Image"
          width={1920}
          height={447}
          className="tw-w-full tw-align-middle"
        />
        <div id="footerInnerImages" className="row m-0">
          <div className="col-md-4">
            <Image
              src="/images/footer/footer2.png"
              alt="Footer animated Image 1"
              width={156}
              height={107}
              sizes="(max-width: 991px) 11vw, 100vw"
              className="tw-animate-[flash_3s_ease-in-out_infinite] tw-absolute tw-bottom-[4vw] tw-left-[4vw] lg:tw-left-[2vw] xl:tw-left-[8vw] max-lg:tw-w-[11vw] max-lg:tw-h-[8vw]"
            />
            <Image
              src="/images/footer/footer3.png"
              alt="Footer animated Image 2"
              width={60}
              height={57}
              sizes="(max-width: 991px) 6vw, 100vw"
              className="tw-animate-[flash_5s_ease-in-out_infinite] tw-absolute tw-bottom-[3vw] lg:tw-bottom-[9vw] tw-right-[1vw] lg:tw-right-[2vw] max-lg:tw-w-[6vw] max-lg:tw-h-[6vw]"
            />
          </div>
          <div className="col-md-4">
            <Image
              src="/images/footer/footer4.png"
              alt="Footer animated Image 3"
              width={58}
              height={92}
              sizes="(max-width: 991px) 6vw, 100vw"
              className="tw-animate-rightToLeft tw-absolute tw-bottom-[5vw] lg:tw-bottom-[12vw] tw-left-[20vw] lg:tw-left-[15vw] xl:tw-left-[10vw]  max-lg:tw-w-[6vw] max-lg:tw-h-[10vw]"
            />
            <Image
              src="/images/footer/footer2.png"
              alt="Footer animated Image 4"
              width={156}
              height={107}
              sizes="(max-width: 991px) 14vw"
              className="tw-animate-[flash_6s_ease-in-out_infinite] tw-absolute tw-bottom-[4vw] lg:tw-bottom-[3vw] -tw-right-[15vw] lg:-tw-right-[14vw] xl:-tw-right-[2vw] tw-w-[14vw] max-lg:tw-h-[10vw]"
            />
          </div>
          <div className="col-md-4">
            <Image
              src="/images/footer/footer3.png"
              alt="Footer animated Image 5"
              width={60}
              height={57}
              sizes="(max-width: 991px) 6vw, 100vw"
              className="tw-animate-[flash_4s_ease-in-out_infinite] tw-absolute tw-bottom-[3vw] tw-right-[4vw] lg:tw-right-[2vw] xl:tw-right-[11vw] max-lg:tw-w-[6vw] max-lg:tw-h-[6vw]"
            />
          </div>
        </div>
      </div>

      {/* Footer Menu Area */}
      <div className="footerTop tw-bg-secondaryHover tw-text-secondaryLight">
        <div className="container">
          <div className="row">
            {FooterItems.map((footeritem, index) => (
              <div
                className="col-lg-3 footerTopcol max-lg:tw-w-full max-lg:after:tw-w-full max-lg:after:tw-h-[1px] max-lg:after:tw-bg-backgroundColor max-lg:after:tw-block max-lg:after:tw-my-3"
                key={index}
              >
                {index == 0 ? (
                  <div id="posfooterleft">
                    <div>
                      <ToggledList footerItem={footeritem} />
                    </div>
                  </div>
                ) : (
                  <ToggledList footerItem={footeritem} />
                )}
              </div>
            ))}
            <div className="col-lg-3 footerTopcol max-lg:tw-w-full tw-block xs:tw-flex xs:tw-flex-wrap xs:tw-justify-between">
              <div className="tw-block">
                <div>
                  <h2 className="tw-relative tw-text-base/[1.2] lg:tw-text-xl/[1.2] tw-font-medium tw-mb-1 lg:tw-mb-2.5 tw-p-0 tw-text-primary tw-capitalize ">
                    Find Us On
                  </h2>
                  <div className="tw-inline-block lg:tw-block">
                    {Socials.map((socialAccount, index) => (
                      <Link
                        key={index}
                        href={socialAccount.url}
                        target="_blank"
                        className="tw-mt-1.2 tw-mr-2 xs:tw-mt-2.5 xs:tw-mr-[3px] xl:tw-mt-2.5 xl:tw-mr-1.2 tw-h-[34px] tw-w-[34px] tw-text-center xl:tw-h-10 xl:tw-w-10 tw-p-0 tw-inline-block"
                      >
                        <Image
                          src={socialAccount.icon}
                          alt={`${socialAccount.name} icon`}
                          width={512}
                          height={512}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="tw-mt-3.75 xs:tw-mt-0 lg:tw-mt-[25px] tw-block">
                <div>
                  <h2 className="tw-relative tw-text-base/[1.2] lg:tw-text-xl/[1.2] tw-mb-1 lg:tw-mb-2.5 tw-p-0 tw-text-primary tw-capitalize ">
                    payment
                  </h2>
                  <div className="tw-inline-block lg:tw-block">
                    <div className="tw-block">
                      {paymentIcons.map((paymentIcon, index) => (
                        <button
                          key={index}
                          className="tw-mt-1.2 tw-mr-2 xs:tw-mt-2.5 xs:tw-mr-[3px] xl:tw-mt-2.5 xl:tw-mr-1.2 tw-h-[34px] tw-w-[34px] tw-text-center xl:tw-h-10 xl:tw-w-10 tw-p-0 tw-inline-block tw-bg-secondary hover:tw-bg-primary tw-text-primary hover:tw-text-secondary tw-rounded-full"
                        >
                          <FontAwesomeIcon
                            icon={paymentIcon}
                            className="tw-h-5 tw-align-middle"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="tw-mt-3 tw-mb-0 lg:tw-mt-7.5 tw-py-3 lg:tw-py-5 tw-text-center tw-border-t tw-border-solid tw-border-t-primary tw-text-primary">
          &#169; {currentYear}{" "}
          <Link
            href="/"
            className="tw-text-secondaryLight hover:tw-text-primary tw-inline-block tw-no-underline"
          >
            Skubey
          </Link>{" "}
          &#126; All Rights Reserved
        </p>

        {/* Scroll To Top */}
        <ScrollToTop />
      </div>
    </footer>
  );
};

export default Footer;
