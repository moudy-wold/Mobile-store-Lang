import React from "react";
import SliderCart from "@/app/[locale]/components/global/SliderCart/SliderCart";
import {GetAllProduct} from "@/app/[locale]/api/phone"
import { Category} from "@/app/[locale]/api/category";
import { GetProductsByCategoryForCustomer } from "@/app/[locale]/api/product";
type Props= {
  category:Category
}
async function ProductsSlider({category}:Props) {
  const res = await GetProductsByCategoryForCustomer(category._id, 1 );
  

  return (
    <main className="container mt-4">
      <SliderCart data={res.data.data} id={category._id} title={category?.title} url={category.name} />
    </main>
  );
}

export default ProductsSlider;
