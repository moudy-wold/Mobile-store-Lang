import React from "react";
import ProductsPage from "@/app/[locale]/components/global/ProductsPage/ProductsPage"

type Props = {
    locale:string;
}
function OfferCard ({locale}:Props){
    return (
        <div className="">
      <ProductsPage locale={locale} id={"554b9aad-2e2d-432d-b452-637cb3226b35"} title={"شاشات"} store={true} />
            
        </div>
    )
}
export default OfferCard