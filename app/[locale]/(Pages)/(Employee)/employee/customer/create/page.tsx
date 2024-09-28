import React from "react";
import CreateCustomer from "@/app/[locale]/components/page/Employee/Customer/CreateCustomer/PageContent";

async function Page({ params: { locale } }: LocaleParams) {


  return (
    <div>
      <CreateCustomer  locale={locale} />
    </div>
  );
}

export default Page;
