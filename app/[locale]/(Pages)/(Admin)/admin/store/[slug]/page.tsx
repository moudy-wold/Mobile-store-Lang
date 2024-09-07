import React from 'react';
import PageContent from "@/app/[locale]/components/page/Admin/Store/Slug/PageContent";

type Props = {
    params: { slug: string };
};

function Page({ params: { slug } }: Props) {

    return (
        <div>
            <PageContent />
        </div>
    )
}

export default Page
