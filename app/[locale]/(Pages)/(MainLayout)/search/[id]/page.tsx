import { SearchProductsMethod } from "@/app/[locale]/api/search";
import { useTranslation } from "@/app/i18n";
import React from "react";
import dynamic from 'next/dynamic'

const ProductsPage = dynamic(() => import('@/app/[locale]/components/global/ProductsPage/ProductsPage'), { ssr: false })
type Props = {
  params: { locale: string; id: string };
};
async function Page({ params: { locale, id } }: Props) {
  const data = await SearchProductsMethod(id);
  const { t } = await useTranslation(locale, "common");
  return (
    <div className="">
      <ProductsPage
        data={data.data}
        title={t("search_results")}
        url=""
        locale={locale}
      />
    </div>
  );
}

export default Page;
