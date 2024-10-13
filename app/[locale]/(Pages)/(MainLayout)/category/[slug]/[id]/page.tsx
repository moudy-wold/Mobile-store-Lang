

import React from "react";
import { GetProductByIdForCustomer } from "@/app/[locale]/api/product";
import dynamic from 'next/dynamic'

const ProductPage = dynamic(() => import('@/app/[locale]/components/page/Category/DynamicSection/ProductPage'))

type Props = {
  params: { locale: string, id: string };
};

async function Page({ params: { locale, id } }: Props) {
  const data = await GetProductByIdForCustomer(id)

  return (
    <div>
      <ProductPage data={data?.data} locale={locale} store={false} />
    </div>

  );
}
export default Page;
