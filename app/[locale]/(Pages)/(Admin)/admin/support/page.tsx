import React from "react";
import Support from "@/app/[locale]/components/page/Admin/Support/PageContent"

async function Page({ params: { locale } }: LocaleParams) {
     
    return (
        <div className="">
            <Support locale={locale} />
        </div>
    )
}
export default Page