import React from "react";

interface CategoryWiseProduct {
  categoryId: number;
  categoryName: string;
  products: {
    id: string;
    name: string;
    images: { url: string; alt: string }[];
  }[];
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //console.log(searchParams);

  // const categorywiseproducts: CategoryWiseProduct = await fetch(
  //   `http://localhost:3000/api/category/${params.name}`
  // ).then((res) => res.json());

  // console.log(categorywiseproducts);

  return (
    // <div className="container">
    //   {categorywiseproducts.categoryName}
    //   {categorywiseproducts.products.map((product) => (
    //     <div key={product.id}>
    //       <h2>{product.name}</h2>
    //       <img
    //         src={`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID_DEV}/${product.images[0].url}`}
    //         alt={product.images[0].alt}
    //       />
    //     </div>
    //   ))}
    // </div>

    <div></div>
  );
}
