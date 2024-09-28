import React  from "react";
import EditeCustomer from "@/app/[locale]/components/page/Admin/Customer/Edit/PageContent"

async function Page({ params: { locale } }: LocaleParams) {

  return (
    <div>
      <EditeCustomer locale={locale} />
    </div>
  );
}

export default Page;
