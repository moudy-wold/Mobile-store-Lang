import React from "react";
import PageContent from "@/app/[locale]/components/page/Admin/Info/PageContent"

async function Page({ params: { locale } }: LocaleParams) {
    
    return (
        <div className="!w-[340px] sm:!w-[640px] md:!w-[768px] lg:!w-full " >
        <div style={{ overflowX: 'auto' }}>
            <PageContent  locale={locale} />
        </div>
        </div>
    )
}

export default Page