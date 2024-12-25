import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import supabaseLoader from "@/supabase-image-loader";

export const metadata: Metadata = {
  title: "About Us",
};

// export const revalidate = 3600;

const AboutUs = async () => {
  // const respose = await fetch(`${getBaseUrl()}/api/images/1.jpg`);

  // const { data } = await respose.json();
  // console.log(data);
  return (
    <div>
      AboutUs
      <Image
        src={supabaseLoader({ src: "products/19.jpg" })}
        alt="Image"
        width={500}
        height={500}
      />
      <h2>Local Image</h2>
      <Image
        src="/images/banners/banner3.png"
        alt="Image"
        width={500}
        height={500}
      />
    </div>
  );
};

export default AboutUs;
