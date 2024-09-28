import React from "react";
import PageContent from "@/app/[locale]/components/page/Admin/Category/PageContent"
import { GetAllCategories } from "@/app/[locale]/api/category";

async function Page({ params: { locale } }: LocaleParams) {

    const data = await GetAllCategories()
    return (
        <div>
            <PageContent data={data.data.data} locale={locale} />
        </div>
    )
}
