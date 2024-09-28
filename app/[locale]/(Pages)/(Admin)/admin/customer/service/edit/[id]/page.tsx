import React from "react";
import EditServiceById from "@/app/[locale]/components/page/Admin/Customer/Service/Edit/PageContent"

async function Page({ params: { locale } }: LocaleParams) {
  return (
    <div>
      <EditServiceById locale={locale} />
    </div>
  )
}

export default Page
