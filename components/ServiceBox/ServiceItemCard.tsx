import React from "react";
import Image from "next/image";

interface ServiceItemCardProp {
  icon: string;
  imagealt: string;
  title: string;
  description: string;
}

const ServiceItemCard = ({
  icon,
  imagealt,
  title,
  description,
}: ServiceItemCardProp) => {
  return (
    <div className="serviceItem max-xs:[&:nth-child(n+2)]:tw-mt-[10px] xs:max-sm:[&:nth-child(n+2)]:tw-mt-[15px] sm:max-lg:[&:nth-child(n+3)]:tw-mt-[15px] lg:[&:nth-child(n+3)]:tw-mt-[30px]">
      <div className="max-xs:tw-flex md:max-lg:tw-flex tw-justify-center tw-items-center tw-h-[321px] tw-text-center tw-bg-secondaryHover tw-px-[10px] tw-py-[15px] lg:tw-py-[30px] xl:tw-py-[50px] xxl:tw-py-[70px] xxl:tw-px-5 tw-border-8 tw-border-solid tw-border-secondary tw-rounded-[50px] tw-shadow-service tw-group/service">
        <div className="tw-relative tw-w-[52px] tw-h-[39px] xl:tw-w-[97px] xl:tw-h-[86px]  max-xs:tw-mr-[10px] xs:max-md:tw-mx-auto lg:tw-mx-auto  md:max-lg:tw-mr-[10px] tw-mb-0  xs:max-md:tw-mb-[15px] lg:tw-mb-[15px] xl:tw-mb-5 xxl:tw-mb-[30px] xs:max-md:tw-mt-10">
          <Image
            src={icon}
            alt={imagealt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="group-hover/service:[transform:rotateY(360deg)] tw-duration-700"
          />
        </div>
        <div>
          <h4 className="tw-text-base/5 tw-uppercase">{title}</h4>
          <p className="tw-text-secondaryLight tw-mb-0">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceItemCard;
