import React from 'react';
import { GetProductByIdForCustomer } from "@/app/[locale]/api/product";
import dynamic from 'next/dynamic'

const DynamicProduct = dynamic(() => import("@/app/[locale]/components/page/WishList/DynamicProdcut/ProductPage"))

type Props = {
  params: { locale: string, id: string };
};
async function Page({ params: { locale, id } }: Props) {
  const data = await GetProductByIdForCustomer(id);
  return (
    <div>
      <DynamicProduct data={data.data} locale={locale} />
    </div>
  )
}

export default Page
