import React from "react";
import { GetAllCategories } from "@/app/[locale]/api/category";
import dynamic from 'next/dynamic'

const PageContent = dynamic(() => import("@/app/[locale]/components/page/Admin/Category/PageContent"), { ssr: false })
async function Page({ params: { locale } }: LocaleParams) {

    const data = await GetAllCategories()
    return (
        <div>
            <PageContent data={data.data.data} locale={locale} />
        </div>
    )
}
export default Page