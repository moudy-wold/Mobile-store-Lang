import React,{useState,useEffect} from "react";
import EditProduct from "@/app/[locale]/components/page/Admin/Category/CrudProducts/EditProduct"
 
async function Page({ params: { locale } }: LocaleParams) {
 
  return (
    <div>
     
     <EditProduct locale={locale}  />
    </div>
  );
}
export default Page;
