import React from "react";
import PageContent from "@/app/[locale]/components/page/Admin/Status/PageContent"
import { GetAllStatuss } from "@/app/[locale]/api/status";
 
async function Page({ params: { locale } }: LocaleParams) {
    const data = await GetAllStatuss()
    
    return (
        <div>
            <PageContent data={data.data} locale={locale} />
        </div>
    )
}
export default Page