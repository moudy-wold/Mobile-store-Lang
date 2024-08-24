import React from "react";
import PageContent from "@/app/[locale]/components/page/Admin/Info/PageContent"
import { GetInfo } from '@/app/[locale]/api/info'
async function Page() {
    const data = await GetInfo()     
    return (
        <div>
            <PageContent data={data?.data?.data}/>
        </div>
    )
}

export default Page