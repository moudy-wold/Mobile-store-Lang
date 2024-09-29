import React from "react";
import dynamic from 'next/dynamic'

const Support = dynamic(() => import("@/app/[locale]/components/page/Admin/Support/PageContent"), { ssr: false })
async function Page({ params: { locale } }: LocaleParams) {
     
    return (
        <div className="">
            <Support locale={locale} />
        </div>
    )
}
export default Page