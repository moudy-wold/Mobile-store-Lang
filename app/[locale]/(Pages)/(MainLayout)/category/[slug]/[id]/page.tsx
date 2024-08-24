 

import React from "react";
import { GetProductByIdForCutsomer } from "@/app/[locale]/api/product";
import ProductPage from "@/app/[locale]/components/page/Category/DynamicSection/ProductPage"
type Props = {
  params: { id: string };
};
async function Page({ params: { id } }: Props) {
  
  const data = await GetProductByIdForCutsomer(id)
 
  return (
    <div>
        <ProductPage data={data?.data}/>
    </div>

  );
}
export default Page;
