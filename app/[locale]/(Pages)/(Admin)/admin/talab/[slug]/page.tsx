import React from 'react';
import PageContent from "@/app/[locale]/components/page/Admin/Talab/Slug/PageContent";

type Props = {
    params: { locale:string,slug: string };
};

function Page({ params: { locale,slug } }: Props) {

    return (
        <div>
            <PageContent locale={locale} />
        </div>
    )
}

export default Page
