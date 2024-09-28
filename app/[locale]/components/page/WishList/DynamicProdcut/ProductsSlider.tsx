import React from "react";
import SliderCart from "@/app/[locale]/components/global/SliderCart/SliderCart";
import { Category} from "@/app/[locale]/api/category";
import { GetProductsByCategoryForCustomer } from "@/app/[locale]/api/product";
type Props= {
  category:Category,
  loclae :LocaleProps|string
}
async function ProductsSlider({category,loclae}:Props) {
  const res = await GetProductsByCategoryForCustomer(category._id, 1 );
  

  return (
    <main className="container mt-4">
      <SliderCart  locale={loclae} data={res.data.data} id={category._id} title={category?.title} url={category.name} />
    </main>
  );
}

export default ProductsSlider;
