import React from "react";
import dynamic from 'next/dynamic'

const EditServiceById = dynamic(() => import("@/app/[locale]/components/page/Admin/Customer/Service/Edit/PageContent"), { ssr: false })
async function Page({ params: { locale } }: LocaleParams) {
  return (
    <div>
      <EditServiceById locale={locale} />
    </div>
  )
}

export default Page
