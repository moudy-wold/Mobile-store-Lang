import React from 'react';
import PageContent from "@/app/[locale]/components/page/Admin/Talab/Slug/PageContent";
import {GetSubCategoriesByMainSlug_Talab} from "@/app/[locale]/api/talab"

type Props = {
    params: { locale: string, slug: string };
};

async function Page({ params: { locale, slug } }: Props) {
    const data = await GetSubCategoriesByMainSlug_Talab(slug)
    return (
        <div className="">
            <PageContent locale={locale} data={data.data} />
        </div>
    )
}

export default Page
