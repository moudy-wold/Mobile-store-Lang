import React from "react";
import CreateInfo from "@/app/[locale]/components/page/Admin/Info/create/Create"
async function Page({ params: { locale } }: LocaleParams) {

    return (
        <div>
            <CreateInfo locale={locale}  />
        </div>
    )
}

export default Page