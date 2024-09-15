import React from 'react';
import DynamicProduct from '@/app/[locale]/components/page/WishList/DynamicProdcut/ProductPage';
import {  GetProductByIdForCustomer} from "@/app/[locale]/api/phone";
type Props = {            
    params: { id: string };
  };                      
async function Page({ params: { id } }: Props) {
    const data = await GetProductByIdForCustomer(id);
  return (
    <div>
      <DynamicProduct data={data.data} />
    </div>
  )
}

export default Page
