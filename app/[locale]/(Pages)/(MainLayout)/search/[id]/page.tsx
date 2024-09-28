
import { SearchProductsMethod } from "@/app/[locale]/api/search";
// import ProductsPage from "@/components/page/Category/Phone/ProductsPage";
import React from "react";


type Props = {
    params: {locale:string, id: string };
};
async function Page({ params: {locale, id } }: Props)  {
    

    const data =( await SearchProductsMethod(id));
  
    return (
        <div className="">
            
            {/* <ProductsPage data={data.data} title="نتائج البحث" url=""  locale={locale} /> */}
        </div>
    )
}

export default Page