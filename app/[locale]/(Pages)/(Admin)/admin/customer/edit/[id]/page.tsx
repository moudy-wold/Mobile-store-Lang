import React  from "react";
import dynamic from 'next/dynamic'

const EditeCustomer = dynamic(() => import("@/app/[locale]/components/page/Admin/Customer/Edit/PageContent"), { ssr: false })
async function Page({ params: { locale } }: LocaleParams) {

  return (
    <div>
      <EditeCustomer locale={locale} />
    </div>
  );
}

export default Page;
