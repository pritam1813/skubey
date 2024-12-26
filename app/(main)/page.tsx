import React from "react";
import Carousel from "@/components/Carousel";
import ServiceBox from "@/components/ServiceBox";
import Products from "@/components/Products";
import Testimonial from "@/components/Testimonial";
import LowerBanner from "@/components/LowerBanner";
import NewsLetter from "@/components/NewsLetter";
import QuickView from "@/components/Products/QuickView";

export default function Home() {
  return (
    <main id="Home Page Main">
      <Carousel />
      <ServiceBox />
      <Products />
      <Testimonial />
      <LowerBanner />
      <NewsLetter />
      <QuickView />
    </main>
  );
}
