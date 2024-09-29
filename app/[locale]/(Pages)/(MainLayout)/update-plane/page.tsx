import React from "react";
import dynamic from 'next/dynamic'

const UpdatePlane = dynamic(() => import("@/app/[locale]/components/page/UpdatePlane/UpdatePlane"),{ssr:false})
async function Page({ params: { locale } }: LocaleParams) {
    return (
        <div className="">
            <UpdatePlane  locale={locale} />
        </div>
    )
}

export default Page;