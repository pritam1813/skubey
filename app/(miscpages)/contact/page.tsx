import React from "react";
import ContactForm from "@/components/Forms/ContactForm";
import {
  faClock,
  faHome,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Contact = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-lg-4">
              <h3 className="tw-text-lg/5 tw-font-medium tw-mb-3.75 tw-pb-2.5 tw-border-b tw-border-solid tw-border-borderColor">
                Our Locations
              </h3>
              <div
                id="card"
                className="tw-mb-5 tw-relative tw-flex tw-flex-col tw-break-words tw-border-solid tw-border tw-border-[rgba(0,0,0,.125)] tw-rounded"
              >
                <div
                  id="cardbody"
                  className="tw-p-5 tw-flex-auto [&>*]:tw-text-center"
                >
                  <div id="address">
                    <div className="tw-mx-auto tw-mb-2.5 tw-w-7.5 tw-h-7.5 tw-bg-primaryHover tw-text-secondary tw-leading-[30px] tw-rounded">
                      <FontAwesomeIcon icon={faHome} />
                    </div>

                    <div className="tw-text-base tw-font-medium tw-capitalize tw-mb-2.5">
                      HeadQuaters
                    </div>
                    <address className="tw-mb-2.5 tw-font-normal tw-block">
                      4,Charkop, Kandivli, Mumbai, Maharashtra
                    </address>

                    <Link
                      href="https://maps.app.goo.gl/uLTJG21VHiA5gs4X9"
                      target="_blank"
                      className="tw-no-underline tw-py-2.5 tw-px-7.5 tw-bg-primary hover:tw-bg-primaryHover tw-text-secondary hover:tw-text-primary tw-rounded-cardcustom tw-text-sm tw-transition-all tw-duration-500 tw-ease-in-out"
                    >
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="tw-h-3.5 tw-leading-none"
                      />{" "}
                      View Google Map
                    </Link>
                  </div>
                  <div
                    id="tel"
                    className="tw-mt-3.75 tw-pt-3.75 tw-border-t tw-border-solid tw-border-borderColor"
                  >
                    <div className="tw-mx-auto tw-mb-2.5 tw-w-7.5 tw-h-7.5 tw-bg-primaryHover tw-text-secondary tw-leading-[30px] tw-rounded">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>

                    <div className="tw-mb-2.5 tw-text-base tw-capitalize tw-font-medium">
                      Call Us At
                    </div>
                    <div>+91 792 535 078</div>
                  </div>
                  <div
                    id="timings"
                    className="tw-mt-3.75 tw-pt-3.75 tw-border-t tw-border-solid tw-border-borderColor"
                  >
                    <div className="tw-mx-auto tw-mb-2.5 tw-w-7.5 tw-h-7.5 tw-bg-primaryHover tw-text-secondary tw-leading-[30px] tw-rounded">
                      <FontAwesomeIcon icon={faClock} />
                    </div>

                    <div className="tw-mb-2.5 tw-text-base tw-capitalize tw-font-medium">
                      Timings
                    </div>
                    <div>8 A.M to 4 P.M</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
