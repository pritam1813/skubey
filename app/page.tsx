import React from "react";
import Carousel from "@/components/Carousel";
import ServiceBox from "@/components/ServiceBox";
import Products from "@/components/Products";

export default function Home() {
  return (
    <main>
      <Carousel />
      <ServiceBox />
      <Products />
    </main>
  );
}
