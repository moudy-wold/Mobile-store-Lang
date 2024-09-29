import React from "react";
import dynamic from 'next/dynamic'

const PageContent = dynamic(() => import('@/app/[locale]/components/page/Compare/PageContent'),{ssr:false})
async function Page({ params: { locale } }: LocaleParams) {
  
  return (
    <div>    
      <PageContent  locale={locale}  />
    </div>
  );
}

export default Page;
