import React from "react";
import dynamic from 'next/dynamic'

const CustomerList = dynamic(() => import("@/app/[locale]/components/page/Admin/Customer/CustomerList/CustomerList"), { ssr: false })
export default async function Page({ params: { locale } }: LocaleParams) {

  return (
    <div className="!w-[390px] sm:!w-[640px] md:!w-[768px] lg:!w-full " >


      <div style={{ overflowX: 'auto' }}>

        <CustomerList locale={locale} />

      </div>
    </div>
  );
}

