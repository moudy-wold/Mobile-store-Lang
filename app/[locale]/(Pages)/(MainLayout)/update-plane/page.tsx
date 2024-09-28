import UpdatePlane from "@/app/[locale]/components/page/UpdatePlane/UpdatePlane";
import React from "react";

async function Page({ params: { locale } }: LocaleParams) {
    return (
        <div className="">
            <UpdatePlane  locale={locale} />
        </div>
    )
}

export default Page;