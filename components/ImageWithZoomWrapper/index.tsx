"use client";
import React from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";

interface ImageWithZoomWrapperProps {
  imageSrc: string;
  width: number;
  height: number;
  alt: string;
}

const ImageWithZoomWrapper = ({
  imageSrc,
  width,
  height,
  alt,
}: ImageWithZoomWrapperProps) => {
  return (
    <InnerImageZoom
      src={imageSrc}
      width={width}
      height={height}
      imgAttributes={{ alt }}
      zoomType="hover"
      hasSpacer={true}
    />
  );
};

export default ImageWithZoomWrapper;
