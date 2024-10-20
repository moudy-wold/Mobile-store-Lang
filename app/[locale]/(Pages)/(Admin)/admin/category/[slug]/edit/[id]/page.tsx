import React from "react";
import dynamic from 'next/dynamic'

const EditProduct = dynamic(() => import("@/app/[locale]/components/page/Admin/Category/CrudProducts/EditProduct/EditProduct"), { ssr: false })
async function Page({ params: { locale } }: LocaleParams) {
 
  return (
    <div>
     
     <EditProduct locale={locale}  />
    </div>
  );
}
export default Page;
