
import { SearchProductsMethod } from "@/app/[locale]/api/search";
// import ProductsPage from "@/components/page/Category/Phone/ProductsPage";
import React from "react";


type Props = {
    params: { id: string };
};
async function Page({ params: { id } }: Props)  {
    

    const data =( await SearchProductsMethod(id));
  
    return (
        <div className="">
            
            {/* <ProductsPage data={data.data} title="نتائج البحث" url="" /> */}
        </div>
    )
}

export default Page