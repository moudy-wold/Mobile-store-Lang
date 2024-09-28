import React from "react";
import Register from "@/app/[locale]/components/page/Auth/Register/PageContent";

 
async function Page({ params: { locale } }: LocaleParams) {
  return (
   <div className="">
    <Register locale={locale} />
   </div>
  );
}

export default Page;
