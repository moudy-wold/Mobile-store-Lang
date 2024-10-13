import React from "react";
import { Category} from "@/app/[locale]/api/category";
import { GetProductsByCategoryForCustomer } from "@/app/[locale]/api/product";
import dynamic from 'next/dynamic'
 
const SliderCart = dynamic(() => import('@/app/[locale]/components/global/SliderCart/SliderCart'), { ssr: false })

type Props= {
  category:Category,
  locale :LocaleProps | string
}
async function ProductsSlider({category,locale}:Props) {
  const res = await GetProductsByCategoryForCustomer(category._id,1);

  return (
    <main className="container mt-4">
      <SliderCart locale={locale} data={res.data.data} id={category._id} title={category?.title} url={category.name} compare={category?.comparison} store={false} />
    </main>
  );
}

export default ProductsSlider;
