import React from 'react';
import DynamicProduct from '@/app/[locale]/components/page/WishList/DynamicProdcut/ProductPage';
import {  GetProductByIdForCustomer} from "@/app/[locale]/api/product";
type Props = {            
    params: { locale:string,id: string };
  };                      
async function Page({ params: { locale,id } }: Props) {
    const data = await GetProductByIdForCustomer(id);
  return (
    <div>
      <DynamicProduct data={data.data} locale={locale}  />
    </div>
  )
}

export default Page
