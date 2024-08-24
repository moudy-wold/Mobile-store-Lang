import React from "react";
import CreateInfo from "@/app/[locale]/components/page/Admin/Info/create/Create"
import { GetInfo } from '@/app/[locale]/api/info'
async function Page() {
    const data = await GetInfo()

    return (
        <div>
            <CreateInfo data={data?.data?.data} />
        </div>
    )
}

export default Page