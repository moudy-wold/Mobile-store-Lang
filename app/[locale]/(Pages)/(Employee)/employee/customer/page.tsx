import React from "react";
import CustomerList from "@/app/[locale]/components/page/Employee/Customer/CustomerList/CustomerList";
 

export default async function Page({ params: { locale } }: LocaleParams) {
  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full " >
      

      <div style={{ overflowX: 'auto' }}>

        <CustomerList  locale={locale} />

      </div>
    </div>
  );
}

