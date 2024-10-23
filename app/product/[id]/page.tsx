import React from "react";
import { Product } from "@/app/types";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ImageWithZoomWrapper from "@/components/ImageWithZoomWrapper";
import ProductOptions from "@/components/Products/ProductOptions";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import DescriptionAndReview from "@/components/Products/DescriptionAndReview";
import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import ProductReviewForm from "@/components/Products/ProductReviewForm";
import { Rating } from "@smastrom/react-rating";
import ProductPrice from "@/components/ProductCard/ProductPrice";

interface ProductResult extends Product {
  error?: string;
}

interface ProductPageProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const data = await fetch(`http://localhost:3000/api/product/${params.id}`);
  const product: ProductResult = await data.json();
  //console.log(result);

  if (!product || product.error) notFound();

  return (
    <>
      <Breadcrumb customTitle={product.name} />
      <div className="tw-max-w-screen-xxl 3xl:tw-max-w-[1400px] tw-mx-auto">
        <div className="container">
          <div className="row">
            <div id="content" className="col-sm-12">
              <div id="productdetails" className="">
                <div className="row">
                  <div className="col-sm-6">
                    <ImageWithZoomWrapper
                      imageSrc={
                        process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID_DEV +
                        "/" +
                        product.images[0].url
                      }
                      width={920}
                      height={1093}
                      alt={product.images[0].alt}
                    />
                    <div className="tw-w-1/2 tw-mx-auto">
                      <CarouselWrapper />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <h1 className="tw-text-xl tw-leading-[1.1] tw-font-medium tw-capitalize tw-mt-2.5 tw-mb-[18px]">
                      {product.name}
                    </h1>
                    <div id="ratingDetails" className="tw-mb-2.5">
                      <span className="tw-max-w-16 tw-inline-flex tw-align-middle">
                        <Rating readOnly value={product.rating} />
                      </span>

                      <span className="tw-ml-2 tw-text-xs tw-text-secondaryLight tw-mr-3.75">
                        {product.rating}
                      </span>
                      <Link
                        href="/"
                        className="tw-text-primary tw-no-underline tw-relative tw-text-sm"
                      >
                        1 Reviews
                      </Link>
                      <Link
                        href="#reviewform"
                        scroll={false}
                        className="tw-text-sm tw-no-underline tw-text-primary hover:tw-text-secondaryLight tw-ml-[13px] tw-pl-3.75 tw-border-l tw-border-solid tw-border-borderColor"
                      >
                        <FontAwesomeIcon
                          icon={faPencil}
                          className="tw-pr-1.2 tw-h-3.5 tw-w-[17px] breadcrumbsign"
                        />
                        Write a review
                      </Link>
                    </div>
                    <hr className="tw-my-5" />
                    <ul className="tw-p-0 tw-capitalize tw-text-sm tw-font-medium tw-mb-3.75">
                      <li>
                        <span className="tw-mr-1.2 tw-leading-[22px] tw-min-w-25 tw-inline-block">
                          brand:
                        </span>
                        <Link
                          href="/brandProducts"
                          className="tw-text-secondaryLight tw-no-underline tw-font-normal"
                        >
                          Brand Name
                        </Link>
                      </li>
                      <li>
                        <span className="tw-mr-1.2 tw-leading-[22px] tw-min-w-25 tw-inline-block">
                          Product Code:
                        </span>
                        <span className="tw-text-secondaryLight tw-no-underline tw-font-normal">
                          code
                        </span>
                      </li>
                      <li>
                        <span className="tw-mr-1.2 tw-leading-[22px] tw-min-w-25 tw-inline-block">
                          availability:
                        </span>
                        <span className="tw-text-secondaryLight tw-no-underline tw-font-normal">
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </li>
                    </ul>
                    <hr className="tw-my-5" />
                    <ul className="tw-text-primary tw-p-0 tw-leading-6">
                      <ProductPrice
                        amount={product.price}
                        discount={product.discount}
                      />
                      <li className="tw-text-sm tw-mt-1.2 tw-text-primary">
                        {" "}
                        GST / Tax:{" "}
                        <span>
                          {" "}
                          {product?.price
                            ? ((18 / 100) * product.price).toFixed(2)
                            : 0}
                        </span>
                      </li>
                    </ul>
                    <hr />

                    {/* Product Options */}
                    <ProductOptions product={product} />
                  </div>
                </div>
              </div>

              <DescriptionAndReview />
              <ProductReviewForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
