import React from "react";
import MyOrder from "@/app/[locale]/components/page/Admin/MyOrder/PageContent"

async function Page({ params: { locale } }: LocaleParams) {
    return (
        <div className="">
            <MyOrder locale={locale} />
        </div>
    )
}
export default Page