import React from "react";
import Carousel from "@/components/Carousel";
import ServiceBox from "@/components/ServiceBox";
import Products from "@/components/Products";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <main>
      <Carousel />
      <ServiceBox />
      <Products />
      <Testimonial />
    </main>
  );
}
