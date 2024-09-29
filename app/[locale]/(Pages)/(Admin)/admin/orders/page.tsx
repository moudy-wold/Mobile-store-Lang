import React from "react";
import PageContent from "@/app/[locale]/components/page/Admin/Orders/PageContent";
import { GetAllOrders } from "@/app/[locale]/api/order";

async function Page({ params: { locale } }: LocaleParams) {
  const data = await GetAllOrders();

  return (
    <div className="">
      <PageContent data={data?.data?.data} locale={locale} />
    </div>
  );
}
export default Page;
