import React from "react";
import PageContent from "@/app/[locale]/components/page/Admin/Category/PageContent"
import { GetAllCategories } from "@/app/[locale]/api/category";

export default async function Page() {

    const data = await GetAllCategories()
    return (
        <div>
            <PageContent data={data.data.data} />
        </div>
    )
}
