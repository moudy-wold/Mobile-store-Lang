import React from "react";
import PageContent from "@/app/[locale]/components/page/Compare/PageContent";

async function Page({ params: { locale } }: LocaleParams) {
  
  return (
    <div>    
      <PageContent  locale={locale}  />
    </div>
  );
}

export default Page;
