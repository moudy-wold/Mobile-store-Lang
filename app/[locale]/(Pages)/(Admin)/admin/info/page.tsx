import React from "react";
import PageContent from "@/app/[locale]/components/page/Admin/Info/PageContent"
import { GetInfo } from '@/app/[locale]/api/info'
async function Page() {
    const data = await GetInfo();    
    return (
        <div className="!w-[340px] sm:!w-[640px] md:!w-[768px] lg:!w-full " >
        <div style={{ overflowX: 'auto' }}>
            <PageContent data={data?.data}/>
        </div>
        </div>
    )
}

export default Page